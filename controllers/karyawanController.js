import { Op } from "sequelize";
import Karyawan from "../models/karyawan.js";
import { getTimestamp, getJwtUsername } from "../utils/helper.js";
import { errorResponse, successResponse } from "../utils/baseResponse.js";

export async function createKaryawan(req, res) {
  const { nama, alamat, gend, tgl_lahir, status } = req.body;
  const file = req.file;
  let photoBase64 = null;
  let tanggalLahir = null;

  if (!nama || !gend || !status) return errorResponse(res, "Validation error", 400, "Nama, Gend, Status required.");

  if (!["L", "P"].includes(gend)) {
    return errorResponse(res, "Validation error", 400, "Gend needs to be 'L' (Laki-laki) or 'P' (Perempuan).");
  }

  if (tgl_lahir) {
    const parsedDate = new Date(tgl_lahir);
    if (isNaN(parsedDate)) {
      return errorResponse(res, "Validation error", 400, "Tanggal lahir format needs to be 'YYYY-MM-DD'.");
    }
    tanggalLahir = parsedDate.toISOString().split("T")[0];
  }

  const allowedTypes = ["image/jpeg", "image/png"];
  if (file) {
    if (!allowedTypes.includes(file.mimetype)) {
      return errorResponse(res, "Validation error", 400, "Invalid file type. Only JPEG and PNG are allowed.");
    }

    photoBase64 = file.buffer.toString("base64");
    if (photoBase64.length > 65535) {
      return errorResponse(res, "Validation error", 400, "File size too large. Maximum file size is 64KB");
    }
  }

  try {
    const lastKaryawan = await Karyawan.findOne({
      order: [["id", "DESC"]],
      attributes: ["id"],
    });

    const nextId = lastKaryawan ? lastKaryawan.id + 1 : 1;

    const nip = `${new Date().getFullYear()}${String(nextId).padStart(4, "0")}`;

    const karyawan = await Karyawan.create({
      id: nextId,
      nip,
      nama,
      alamat,
      gend,
      photo: photoBase64,
      tgl_lahir: tanggalLahir,
      status,
      insert_at: getTimestamp(),
      insert_by: getJwtUsername(req),
    });

    return successResponse(res, karyawan, "Successfully created karyawan");
  } catch (err) {
    return errorResponse(res, "Internal server error", 500, err.message);
  }
}

export async function getKaryawan(req, res) {
  const { keyword, start = 0, count = 10 } = req.query;
  try {
    const where = {};

    if (keyword) {
      where[Op.or] = [
        { nip: { [Op.like]: `%${keyword}%` } },
        { nama: { [Op.like]: `%${keyword}%` } },
        { alamat: { [Op.like]: `%${keyword}%` } },
        { gend: { [Op.like]: `%${keyword}%` } },
        { tgl_lahir: { [Op.like]: `%${keyword}%` } },
        { status: { [Op.like]: `%${keyword}%` } },
      ];
    }

    const { count: totalCount, rows: karyawan } = await Karyawan.findAndCountAll({
      where,
      offset: parseInt(start),
      limit: parseInt(count),
    });

    const totalPages = Math.ceil(totalCount / parseInt(count));

    const data = {
      karyawan,
      meta: {
        totalCount,
        currentPage: parseInt(start),
        count: parseInt(count),
        totalPages,
      },
    };

    return successResponse(res, data, "Successfully get karyawan");
  } catch (err) {
    return errorResponse(res, "Internal server error", 500, err.message);
  }
}

export async function updateKaryawan(req, res) {
  const { nip } = req.params;
  const { nama, alamat, gend, tgl_lahir, status } = req.body;
  const file = req.file;
  let photoBase64 = null;
  let tanggalLahir = null;

  if (!nama || !gend || !status) return errorResponse(res, "Validation error", 400, "Nama, Gend, Status required.");

  if (!["L", "P"].includes(gend)) {
    return errorResponse(res, "Validation error", 400, "Gend needs to be 'L' (Laki-laki) or 'P' (Perempuan).");
  }

  if (tgl_lahir) {
    const parsedDate = new Date(tgl_lahir);
    if (isNaN(parsedDate)) {
      return errorResponse(res, "Validation error", 400, "Tanggal lahir format needs to be 'YYYY-MM-DD'.");
    }
    tanggalLahir = parsedDate.toISOString().split("T")[0];
  }

  const allowedTypes = ["image/jpeg", "image/png"];
  if (file) {
    if (!allowedTypes.includes(file.mimetype)) {
      return errorResponse(res, "Validation error", 400, "Invalid file type. Only JPEG and PNG are allowed.");
    }

    photoBase64 = file.buffer.toString("base64");
    if (photoBase64.length > 65535) {
      return errorResponse(res, "Validation error", 400, "File size too large. Maximum file size is 64KB");
    }
  }

  try {
    const karyawan = await Karyawan.findOne({ where: { nip } });
    if (!karyawan) return errorResponse(res, "Failed to find karyawan", 404, "Karyawan not found");

    karyawan.nama = nama;
    karyawan.alamat = alamat;
    karyawan.gend = gend;
    karyawan.photo = photoBase64;
    karyawan.tgl_lahir = tanggalLahir;
    karyawan.status = status;
    karyawan.update_at = getTimestamp();
    karyawan.update_by = getJwtUsername(req);
    await karyawan.save();
    
    return successResponse(res, karyawan, "Successfully updated karyawan");
  } catch (err) {
    return errorResponse(res, "Internal server error", 500, err.message);
  }
}

export async function deactivateKaryawan(req, res) {
  const { nip } = req.params;
  try {
    const karyawan = await Karyawan.findOne({ where: { nip } });
    if (!karyawan) return errorResponse(res, "Failed to deactivate karyawan", 404, "Karyawan not found");

    console.log(getTimestamp());

    karyawan.status = 9;
    karyawan.update_at = getTimestamp();
    karyawan.update_by = getJwtUsername(req);
    await karyawan.save();
    return successResponse(res, karyawan, "Successfully deactivated karyawan");
  } catch (err) {
    return errorResponse(res, "Internal server error", 500, err.message);
  }
}
