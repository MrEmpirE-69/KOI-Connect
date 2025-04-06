import FacultyCategory from "../../../main/faculties/model/FacultyCategory.js";
import { v4 as uuidv4 } from "uuid";

const createFacultyCategory = async () => {
  const uuid1 = uuidv4();
  const uuid2 = uuidv4();

  const [facultyCategory1] = await FacultyCategory.findOrCreate({
    where: { name: "Administrative" },
    defaults: {
      name: "Administrative",
      uuid: uuid1,
    },
  });

  const [facultyCategory2] = await FacultyCategory.findOrCreate({
    where: { name: "Teaching" },
    defaults: {
      name: "Teaching",
      uuid: uuid2,
    },
  });
};

export default createFacultyCategory;
