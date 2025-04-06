import User from "../../../main/usermanager/model/User.js";
import { v4 as uuidv4 } from "uuid";

const createSuperAdmin = async () => {
  const uuid = uuidv4();
  const [user] = await User.findOrCreate({
    where: { email: "kcmitadmin" },
    defaults: {
      fullName: "KCMIT Admin",
      password: "$2b$10$oLneOCRTOaT.YVmHTnudT.BrAuzNOc3Y.dVjO0zgy8ttuRxr0yvz2",
      address: "Mid Baneshwor, Kathmandu",
      mobileNumber: "9810203040",
      uuid: uuid,
      isVerified: true,
      status: "ACTIVE",
      isSuperAdmin: true,
    },
  });
};
export default createSuperAdmin;
