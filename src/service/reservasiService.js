import { prismaClient } from "../app/db.js";
import { ResponseError } from "../error/response-error.js";

const createReservasiService = async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set the time to midnight for today
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const isReserved = await prismaClient.reservasi.count({
    where: {
      reserved_date: {
        gte: today,
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
          gte: today,
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
          reserved_date: new Date().toISOString(),
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

export default {
  createReservasiService,
};
