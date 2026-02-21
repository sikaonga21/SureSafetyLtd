import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductsSection from "@/components/ProductsSection";

const ProductsPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="bg-section-dark py-20">
          <div className="container text-center">
            <p className="text-primary font-heading font-semibold text-sm tracking-wider uppercase mb-2">Our Range</p>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-section-dark-fg">Products Catalog</h1>
          </div>
        </section>
        <ProductsSection />
      </main>
      <Footer />
    </div>
  );
};

export default ProductsPage;
