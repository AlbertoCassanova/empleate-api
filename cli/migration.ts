import { User } from "../src/modelS/User.ts";
import { Negocios } from "../src/modelS/Negocios.ts";

const Migration = async() => {
    await User.sync({force: true });
    await Negocios.sync({ force: true });
}
Migration();
console.log("Base de datos sincronizada correctamente");
