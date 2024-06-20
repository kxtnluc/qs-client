import { putIsPaidUser } from "../../managers/userprofileManager";
import { SubChecker } from "./SubChecker";

export const ValidateUserSub = async (loggedInUser:any) => {

    const hasValidSubscription = await SubChecker(loggedInUser);
    console.log('hasV',hasValidSubscription)

    if(hasValidSubscription !== loggedInUser.paidUser){
      if(hasValidSubscription){
        // console.log(true)
        putIsPaidUser(loggedInUser.id, true)
      }
      else if (!hasValidSubscription){
        // console.log(false)

        putIsPaidUser(loggedInUser.id, false)
      }

      return;
    }

    return;

}