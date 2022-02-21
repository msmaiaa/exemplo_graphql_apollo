import { CONST } from "../constants/";
import { sign } from "jsonwebtoken";

export const signToken = (obj: object) =>
  sign(obj, CONST.JWT_SECRET, { expiresIn: "365d" });
