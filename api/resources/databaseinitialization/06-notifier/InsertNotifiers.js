import Notifier from "../../../main/notifier/model/Notifier.js";
import { v4 as uuidv4 } from "uuid";

const createNotifier = async () => {
  try {
    const notifiers = [
      { name: "ADMIN" },
      { name: "STUDENT" },
      { name: "FACULTY" },
      { name: "ALL" },
    ];

    for (const notifier of notifiers) {
      await Notifier.findOrCreate({
        where: { name: notifier.name },
        defaults: {
          name: notifier.name,
          uuid: uuidv4(),
        },
      });
    }
    console.log("Notifiers initialized.");
  } catch (error) {
    console.error("Error initializing notifiers:", error);
  }
};

export default createNotifier;
