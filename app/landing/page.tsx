import Hero from "./hero/hero";
import NavBar from "./navBar/navBar";
import FooterComponent from "./footer/footer";

const LandingPage = () => {
    return (
        <div className="bg-white dark:bg-gray-900">
            <NavBar />
            <Hero />
            <FooterComponent/>
        </div>
    )
}
export default LandingPage;