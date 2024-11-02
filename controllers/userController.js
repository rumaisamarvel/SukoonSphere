import { StatusCodes } from "http-status-codes";
import { NotFoundError, UnauthorizedError } from "../errors/customErors.js";
import { verifyJWT } from "../utils/tokenUtils.js";
import User from "../models/userModel.js";
import { formatImage } from "../middleware/multer.js";
  import cloudinary from "cloudinary";

export const getUserRole = async (req, res) => {
  let currentUserRole = "";
  const { token } = req.cookies;
  if (!token) {
    currentUserRole = "visiter";
    res.status(StatusCodes.OK).json({ userRole: currentUserRole });
  }
  try {
    const { role } = verifyJWT(token);
    currentUserRole = role;
    res.status(StatusCodes.OK).json({ userRole: currentUserRole });
  } catch {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "internal server errror" });
  }
};
export const getAdminData = async(req, res) => {
        const adminDetails = await User.findOne({ role: "admin" }).select("-password -role");
   res.status(StatusCodes.OK).json({adminDetails});

}
export const updateAdminData = async (req, res) => {
  if (req.user.role !== "admin")
    throw new UnauthorizedError("You are not authorized to access this route");

  const { id } = req.params;
  const updateUser = { ...req.body };

  if (req.files && req.files.avatar) {
    const avatarFile = formatImage(req.files.avatar[0]);
    const avatarResponse = await cloudinary.v2.uploader.upload(avatarFile);
    updateUser.avatar = avatarResponse.secure_url;
    updateUser.avatarPublicId = avatarResponse.public_id;
  }

  if (req.files && req.files.avatar1) {
    const avatar1File = formatImage(req.files.avatar1[0]);
    const avatar1Response = await cloudinary.v2.uploader.upload(avatar1File);
    updateUser.avatar1 = avatar1Response.secure_url;
    updateUser.avatar1PublicId = avatar1Response.public_id;
  }

  const UpdatedUser = await User.findByIdAndUpdate(id, updateUser);
  if (!UpdatedUser) throw new NotFoundError(`No user with id ${id}`);

  // Remove old images from Cloudinary
  if (req.files && req.files.avatar && UpdatedUser.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(UpdatedUser.avatarPublicId);
  }
  if (req.files && req.files.avatar1 && UpdatedUser.avatar1PublicId) {
    await cloudinary.v2.uploader.destroy(UpdatedUser.avatar1PublicId);
  }

  res.status(StatusCodes.OK).json({ msg: "User updated" });
};
