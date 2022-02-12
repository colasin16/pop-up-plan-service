import { User } from "./models/User";
import { UserView } from "./views/UserView";
import { BetaConsole } from "./utils/BetaConsole";

export class Planner {
  private userView: UserView;

  constructor() {
    console.log("Planner initialized");
    const user = new User(); // just a fake
    this.userView = new UserView();
  }

  public async justATest() {
    const console = new BetaConsole();
    const owner = await console.readString("dame el owner: ");
    const title = await console.readString("dame el title: ");
    const location = await console.readString("dame el location: ");
    const time = await console.readNumber("dame el time: ");
    const category = await console.readString("dame el category: ");
    const privacy = await console.readString("dame el privacy: ");
    const description = await console.readString("dame el description: ");
    const capacity = await console.readNumber("dame el capacity: ");
    this.userView.createPlan({
      owner,
      title,
      location,
      time,
      category,
      privacy,
      description,
      capacity,
    });

    console.print("voy a buscar un plan jejejeje");

    const response = this.userView.findPlan({ id: "estudia pringao" });
    console.print(JSON.stringify(response));
  }
}
