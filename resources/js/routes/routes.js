// import modular routes
import webRoutes from "../modules/web/routes"
import authRoutes from "../modules/auth/routes"
import userRoutes from "../modules/user/routes"
import itemRoutes from "../modules/item/routes"

export default [...webRoutes, ...authRoutes, ...userRoutes, ...itemRoutes]
