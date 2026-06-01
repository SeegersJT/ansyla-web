import { Sparkles } from "lucide-react";


function App() {

  return (
    <div>
      {/* Hero */}
      <section className="relative">
        <div className="relative h-[88vh] min-h-[560px] w-full overflow-hidden">
          <img
            alt="ANSYLA luxury gold diamond jewelry"
            width={1920}
            height={1080}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />

          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto w-full max-w-7xl px-6">
              <div className="max-w-xl">
                <p className="mb-4 text-xs uppercase tracking-luxe text-primary">
                  ANSYLA Jewels · South Africa
                </p>
                <h1 className="font-serif text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
                  Timeless Beauty,{" "}
                  <span className="text-gradient-gold">Precious You</span>
                </h1>
                <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
                  Discover exquisite jewelry crafted to celebrate your elegance,
                  confidence, and individuality.
                </p>
                <div className="mt-9 flex flex-wrap gap-4">
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mb-12 text-center">
          <p className="text-xs uppercase tracking-luxe text-primary">Explore</p>
          <h2 className="mt-3 font-serif text-4xl">Featured Collections</h2>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        
        </div>
      </section>

      {/* Best Sellers */}
      <section className="border-y border-border bg-card/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <p className="text-xs uppercase tracking-luxe text-primary">Adored</p>
              <h2 className="mt-3 font-serif text-4xl">Best Sellers</h2>
            </div>
           
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
            
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mb-12 text-center">
          <p className="text-xs uppercase tracking-luxe text-primary">Just In</p>
          <h2 className="mt-3 font-serif text-4xl">New Arrivals</h2>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
          
        </div>
      </section>

      {/* Why ANSYLA */}
      <section className="border-y border-border bg-card/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-12 text-center">
            <p className="text-xs uppercase tracking-luxe text-primary">The ANSYLA Promise</p>
            <h2 className="mt-3 font-serif text-4xl">Why Choose ANSYLA Jewels</h2>
          </div>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
            
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mb-12 text-center">
          <p className="text-xs uppercase tracking-luxe text-primary">Loved By</p>
          <h2 className="mt-3 font-serif text-4xl">Words From Our Circle</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
         
        </div>
      </section>

      {/* Newsletter */}
      <section className="border-t border-border bg-gradient-to-b from-card to-background py-24">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <Sparkles className="mx-auto h-8 w-8 text-primary" />
          <h2 className="mt-5 font-serif text-4xl">Become Part of the ANSYLA Circle</h2>
          <p className="mt-4 text-muted-foreground">
            Exclusive offers, private previews, and first access to new collections.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mx-auto mt-8 flex max-w-md gap-2"
          >
            <input
              type="email"
              required
              placeholder="Your email address"
              className="flex-1 border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
            />
            <button className="bg-gradient-gold px-6 text-xs font-medium uppercase tracking-luxe text-primary-foreground">
              Join
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default App
