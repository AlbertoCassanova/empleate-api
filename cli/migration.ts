import { User } from "../src/modelS/User.ts";
import { Negocios } from "../src/modelS/Negocios.ts";
import { Posts } from "../src/modelS/Posts.ts"
import "../src/modelS/Relationships.ts";

const Migration = async() => {

    await User.sync({alter: true});
    await Negocios.sync({ alter: true});
    await Posts.sync()
}
Migration();
console.log("Base de datos sincronizada correctamente");
