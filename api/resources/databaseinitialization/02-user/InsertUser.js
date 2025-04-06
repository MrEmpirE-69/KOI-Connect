import User from "../../../main/usermanager/model/User.js";
import { v4 as uuidv4 } from "uuid";

const createSuperAdmin = async () => {
  const uuid = uuidv4();
  const [user] = await User.findOrCreate({
    where: { email: "koiadmin" },
    defaults: {
      fullName: "KOI Admin",
      password: "$2a$12$0IaGsDlI.adjQfvQ8Vhe.OkS/yLKcc/T9RvNDxuENhOLOGhOj09IW",
      address: "XYZ",
      mobileNumber: "9810203040",
      uuid: uuid,
      isVerified: true,
      status: "ACTIVE",
      isSuperAdmin: true,
    },
  });
};
export default createSuperAdmin;
