import { prismaClient } from "../app/db.js";
import { ResponseError } from "../error/response-error.js";

const createReservasiService = async (req, res) => {
  const date = new Date(req.body.reserved_date);

  const tomorrow = new Date(date);
  tomorrow.setDate(tomorrow.getDate() + 1);

  // Format the date as YYYY-MM-DD HH:MM:SS
  const isReserved = await prismaClient.reservasi.count({
    where: {
      reserved_date: {
        gte: date,
        lt: tomorrow,
      },
      user_id: res.data.data.user_id,
      NOT: {
        status: "cancelled",
      },
    },
  });
  if (isReserved < 1) {
    const pending = await prismaClient.reservasi.count({
      where: {
        reserved_date: {
          gte: date,
          lt: tomorrow,
        },
        NOT: {
          status: "cancelled",
        },
      },
    });
    const capacity = await prismaClient.services.findFirst({
      where: {
        service_id: req.body.service_id,
      },
      select: {
        capacity: true,
      },
    });
    if (pending < capacity.capacity) {
      return prismaClient.reservasi.create({
        data: {
          user_id: res.data.data.user_id,
          reserved_date: date,
          service_id: req.body.service_id,
        },
      });
    } else {
      throw new ResponseError(401, "Full Capacity");
    }
  } else {
    throw new ResponseError(403, "Already Reserved");
  }
};

const getReservasiService = async (req) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayDate = new Date(today.getTime() + 7 * 60 * 60 * 1000); // Adding 7 hours in milliseconds to get GMT+7

  const reservasis = await prismaClient.reservasi.findMany({
    where: {
      service_id: parseInt(req.params.id),
      reserved_date: todayDate,
    },
    take: 50,
    select: {
      reservasi_id: true,
      status: true,
      reserved_date: true,
      user: { select: { name: true, email: true } },
    },
  });
  return reservasis;
};

const getReservasiByUserService = async (req, res) => {
  const data = res.data.data.user_id;
  const reservasis = await prismaClient.reservasi.findMany({
    where: {
      user_id: data,
    },
    take: 50,
    select: {
      reservasi_id: true,
      status: true,
      reserved_date: true,
      user: { select: { name: true, email: true } },
      service: {
        select: {
          klinik: {
            select: {
              klinik_address: true,
            },
          },
        },
      },
    },
  });
  return reservasis;
};

const getReservasiByKlinikService = async (req, res) => {
  const data = req.params.id;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const reservasis = await prismaClient.reservasi.findMany({
    where: {
      service: {
        klinik_id: parseInt(data),
      },
      reserved_date: {
        gte: today,
        lt: tomorrow,
      },
    },
    take: 50,
    select: {
      reservasi_id: true,
      status: true,
      user_id: true,
      reserved_date: true,
      user: { select: { name: true, email: true } },
      service: {
        select: {
          klinik: {
            select: {
              klinik_address: true,
            },
          },
        },
      },
    },
  });
  return reservasis;
};

const patchConfirmReservasiService = async (req, res) => {
  try {
    const { reservasi_id, status } = req.body;
    const validStatuses = ["pending", "done", "cancelled"];

    // Validate the status
    if (!validStatuses.includes(status)) {
      throw new ResponseError(400, "Invalid status");
    }

    // Check if the reservation exists
    const reservation = await prismaClient.reservasi.findUnique({
      where: { reservasi_id: parseInt(reservasi_id) },
    });

    if (!reservation) {
      throw new ResponseError(404, "Reservation not found");
    }

    // Update the reservation status
    const updatedReservation = await prismaClient.reservasi.update({
      where: { reservasi_id: parseInt(reservasi_id) },
      data: { status: status, updatedAt: new Date() },
    });

    // Return the updated reservation
    return res.status(200).json({
      message: "Reservation status updated successfully",
      data: updatedReservation,
    });
  } catch (error) {
    if (error instanceof ResponseError) {
      return res.status(error.statusCode).json({ error: error.message });
    } else {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

export default {
  createReservasiService,
  getReservasiService,
  getReservasiByUserService,
  getReservasiByKlinikService,
  patchConfirmReservasiService,
};
