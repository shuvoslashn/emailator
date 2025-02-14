import Footer from "@/components/custom/Footer";
import Header from "@/components/custom/Header";

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Header />
            {children}
            <Footer />
        </div>
    );
}
