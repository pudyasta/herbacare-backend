import { prismaClient } from "../app/db.js";
import { createServiceValidation } from "../validation/serviceValidation.js";
import { validate } from "../validation/validation.js";

const createService = async (req, res) => {
  const newArticle = validate(createServiceValidation, req.body);
  return prismaClient.services.create({
    data: {
      service_name: newArticle.service_name,
      capacity: newArticle.capacity,
      klinik: {
        connect: {
          klinik_id: parseInt(res.data.data.klinik_id),
        },
      },
    },
  });
};

export default { createService };
