import "./styles.css";

const contacts = [
  { name: "Lipton", phone: "718-791-2781", role: "Commercial inquiries" },
  { name: "Yogie", phone: "347-635-9098", role: "Operations" },
  { name: "Akhter", phone: "929-327-3357", role: "Trade coordination" }
];

const emails = [
  { label: "Lipton", email: "Liptonmourin@yogiecorp.com" },
  { label: "Akhtar", email: "akhtar@yogiecorp.com" },
  { label: "Yogie", email: "yogie@yogiecorp.com" }
];

const products = [
  {
    name: "Wheat",
    copy: "Bulk wheat supply for milling, feed, and commercial food production.",
    image: "https://images.unsplash.com/photo-1501430654243-c934cec2e1c0?auto=format&fit=crop&w=700&q=82",
    market: "Milling, feed, food production",
    format: "Bulk / container shipments",
    specs: ["Milling / feed grades", "Bulk shipment", "Buyer specification review"]
  },
  {
    name: "Corn",
    copy: "Yellow corn and feed-grade corn for processors, distributors, and livestock markets.",
    image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=700&q=82",
    market: "Processors, distributors, livestock",
    format: "Yellow corn / feed grade",
    specs: ["Yellow corn", "Feed-grade supply", "Container or bulk discussion"]
  },
  {
    name: "Soybean",
    copy: "Soybean sourcing for crushing, feed production, food processing, and wholesale trade.",
    image: "https://images.unsplash.com/photo-1696124651786-218e47e63c73?auto=format&fit=crop&w=700&q=82",
    market: "Crushers, feed, wholesale",
    format: "Origin-based commercial offers",
    specs: ["Commercial soybean", "Crusher / feed use", "Origin-based offers"]
  },
  {
    name: "Rice",
    copy: "Commercial rice supply for import programs, distributors, and institutional buyers.",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=700&q=82",
    market: "Importers, distributors, institutions",
    format: "Bulk / packaged options",
    specs: ["Bulk and packaged options", "Import programs", "Destination planning"]
  },
  {
    name: "Edible Oils",
    copy: "Cooking oils and agricultural oil products for wholesale and retail supply chains.",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=700&q=82",
    market: "Wholesale and retail supply chains",
    format: "Packaging based on buyer need",
    specs: ["Commercial supply", "Packaging options", "Retail / wholesale channels"]
  },
  {
    name: "Commercial Products",
    copy: "Market-ready agricultural goods, packaged products, and related trade items.",
    image: "https://images.unsplash.com/photo-1579113800032-c38bd7635818?auto=format&fit=crop&w=700&q=82",
    market: "Wholesale, retail, hospitality",
    format: "Packaged and market-ready goods",
    specs: ["Packaged goods", "Wholesale lots", "Product-by-product sourcing"]
  }
];

const processSteps = [
  ["01", "Inquiry Review", "Product, quantity, destination, packaging, and timeline are confirmed before pricing discussion."],
  ["02", "Source & Offer", "Available supply, commercial terms, documents, and shipment options are organized for review."],
  ["03", "Coordination", "Buyer, supplier, and logistics details are followed through until the order is ready to move."]
];

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <header class="site-header">
    <div class="top-bar">
      <div>
        <span>Queens, NY</span>
        <a href="mailto:Liptonmourin@yogiecorp.com">Liptonmourin@yogiecorp.com</a>
      </div>
      <a href="tel:+17187912781">Commercial desk: 718-791-2781</a>
    </div>
    <nav class="nav" aria-label="Main navigation">
      <a class="brand" href="#home">
        <span class="brand-logo">YC</span>
        <span><strong>YOGIE CORPORATION</strong><small>Export & Import</small></span>
      </a>
      <button class="nav-toggle" type="button" aria-label="Open menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
      <div class="nav-links">
        <a href="#home">Home</a>
        <a href="#products">Products</a>
        <a href="#services">Services</a>
        <a href="#about">About Us</a>
        <a href="#contact">Contact</a>
        <a class="nav-cta" href="#inquiry">Inquiry</a>
      </div>
    </nav>
  </header>

  <main>
    <section class="hero page" id="home" data-page="home">
      <div class="hero-content">
        <p class="eyebrow">Export & Import Trading</p>
        <h1>YOGIE CORPORATION</h1>
        <p class="hero-copy">Commercial sourcing and trade coordination for wheat, corn, soybean, rice, edible oils, and agricultural products.</p>
        <div class="hero-actions">
          <a class="btn primary" href="#inquiry">Get a Quote</a>
          <a class="btn secondary" href="#products">View Products</a>
        </div>
        <div class="trade-brief" aria-label="Trade capabilities">
          <div><strong>Products</strong><span>Grains, oilseeds, rice, edible oils</span></div>
          <div><strong>Markets</strong><span>Importers, wholesalers, processors</span></div>
          <div><strong>Office</strong><span>Queens, New York, USA</span></div>
        </div>
      </div>
    </section>

    <section class="section intro page" data-page="home">
      <div class="section-inner intro-grid">
        <div>
          <p class="eyebrow">Queens, New York</p>
          <h2>Commodity trade handled with clear terms and practical follow-up.</h2>
        </div>
        <p>YOGIE CORPORATION works with buyers, suppliers, brokers, and distributors across core agricultural products. Inquiries are reviewed around specification, quantity, destination, documentation needs, and timing so commercial discussions can move efficiently.</p>
      </div>
    </section>

    <section class="section products page" id="products" data-page="products">
      <div class="section-inner">
        <div class="section-heading">
          <p class="eyebrow">Products</p>
          <h2>Agricultural Products</h2>
          <p class="section-copy">Focused product categories for international purchasing, wholesale distribution, and commercial supply programs.</p>
        </div>
        <div class="product-showcase" aria-label="Agricultural product categories">
          ${products
            .map(
              (product) => `
                <article class="product-card">
                  <div class="product-media">
                    <img src="${product.image}" alt="${product.name} product supply" loading="lazy">
                  </div>
                  <div class="product-body">
                    <h3>${product.name}</h3>
                    <p>${product.copy}</p>
                    <dl>
                      <div><dt>Market</dt><dd>${product.market}</dd></div>
                      <div><dt>Format</dt><dd>${product.format}</dd></div>
                    </dl>
                    <div class="spec-tags">
                      ${product.specs.map((spec) => `<span>${spec}</span>`).join("")}
                    </div>
                    <a class="product-link" href="#inquiry" data-product="${product.name}">Request quote</a>
                  </div>
                </article>
              `
            )
            .join("")}
        </div>
      </div>
    </section>

    <section class="section services page" id="services" data-page="services">
      <div class="section-inner services-grid">
        <div>
          <p class="eyebrow">Services</p>
          <h2>Trade support from first inquiry through shipment planning.</h2>
          <p class="dark-copy">The company keeps the process direct: confirm the requirement, organize available supply, and coordinate the commercial details needed for movement.</p>
        </div>
        <div class="service-list">
          <article><h3>Export & Import Coordination</h3><p>Buyer and supplier communication, order follow-up, documentation support, and practical trade coordination.</p></article>
          <article><h3>Bulk Commodity Sourcing</h3><p>Product sourcing for wheat, corn, soybean, rice, edible oils, and related agricultural categories.</p></article>
          <article><h3>Commercial Product Supply</h3><p>Packaged and market-ready product support for wholesale, retail, hospitality, and industrial customers.</p></article>
          <article><h3>Logistics Preparation</h3><p>Container planning, delivery schedules, product details, and shipment information organized before dispatch.</p></article>
        </div>
      </div>
    </section>

    <section class="section process page" data-page="services">
      <div class="section-inner">
        <div class="section-heading compact">
          <p class="eyebrow">Process</p>
          <h2>How inquiries are handled</h2>
        </div>
        <div class="process-grid">
          ${processSteps
            .map(
              ([number, title, copy]) => `
                <article>
                  <span>${number}</span>
                  <h3>${title}</h3>
                  <p>${copy}</p>
                </article>
              `
            )
            .join("")}
        </div>
      </div>
    </section>

    <section class="section inquiry-page page" id="inquiry" data-page="inquiry">
      <div class="section-inner inquiry-shell">
        <div class="inquiry-intro">
          <p class="eyebrow">Inquiry</p>
          <h2>Request a Quote</h2>
          <p>Send the product requirement, quantity, destination, packaging preference, and target schedule. The inquiry goes to Lipton, Akhtar, and Yogie once SMTP is configured.</p>
          <div class="quote-checklist">
            <span>Product specification</span>
            <span>Quantity and destination</span>
            <span>Packaging and timeline</span>
          </div>
        </div>

        <form class="contact-form quote-form" id="contact-form">
          <div class="form-heading">
            <h3>Quote Request Form</h3>
            <p>Share enough detail for a commercial review.</p>
          </div>
          <label>Name<input type="text" name="name" autocomplete="name" required></label>
          <label>Email<input type="email" name="email" autocomplete="email" required></label>
          <label>Phone<input type="tel" name="phone" autocomplete="tel"></label>
          <label>Product
            <select name="product" required>
              ${products.map((product) => `<option>${product.name}</option>`).join("")}
            </select>
          </label>
          <label>Quantity<input type="text" name="quantity" placeholder="Example: 2 containers"></label>
          <label>Destination<input type="text" name="destination" placeholder="City, country, or port"></label>
          <label class="full">Message<textarea name="message" rows="5" required placeholder="Product specification, packaging, timing, and any target price"></textarea></label>
          <button class="btn primary" type="submit">Submit Quote Request</button>
          <p class="form-status" role="status"></p>
        </form>
      </div>
    </section>

    <section class="section about page" id="about" data-page="about">
      <div class="section-inner about-grid">
        <div class="about-image" aria-hidden="true"></div>
        <div>
          <p class="eyebrow">About Us</p>
          <h2>New York based, commercially focused, and responsive.</h2>
          <p>Based at 78-43 267th Street, Queens, NY 11004, USA, YOGIE CORPORATION supports import and export opportunities across essential agricultural commodities. The company is built around straightforward trade communication, practical sourcing, and careful handling of buyer requirements.</p>
          <div class="metrics">
            <div><strong>6</strong><span>Product categories</span></div>
            <div><strong>NY</strong><span>Queens business office</span></div>
          </div>
          <div class="about-location">
            <h3>Office Location</h3>
            <p>78-43 267th Street, Queens, NY 11004, USA</p>
            <a href="https://www.google.com/maps/search/?api=1&query=78-43%20267th%20Street%2C%20Queens%2C%20NY%2011004%2C%20USA" target="_blank" rel="noreferrer">Open in Google Maps</a>
          </div>
        </div>
      </div>
      <div class="section-inner about-map">
        <div class="map-card">
          <div class="map-card-header">
            <div>
              <p class="eyebrow">Office Map</p>
              <h3>Queens, New York Location</h3>
            </div>
            <a href="https://www.google.com/maps/search/?api=1&query=78-43%20267th%20Street%2C%20Queens%2C%20NY%2011004%2C%20USA" target="_blank" rel="noreferrer">Open Map</a>
          </div>
          <div class="map-frame">
            <iframe
              title="YOGIE CORPORATION Queens office location"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=78-43%20267th%20Street%2C%20Queens%2C%20NY%2011004%2C%20USA&output=embed">
            </iframe>
          </div>
          <div class="map-card-footer">
            <span>YOGIE CORPORATION</span>
            <strong>78-43 267th Street, Queens, NY 11004, USA</strong>
          </div>
        </div>
      </div>
    </section>

    <section class="section contact page" id="contact" data-page="contact">
      <div class="section-inner contact-grid">
        <div class="contact-summary">
          <p class="eyebrow">Contact</p>
          <h2>Reach the commercial team.</h2>
          <p>Use the inquiry page for pricing requests. For direct communication, contact the team by phone or email during business correspondence.</p>
          <div class="contact-aside">
            <span>Trade inquiry desk</span>
            <h3>Need pricing or availability?</h3>
            <p>Send the product, quantity, destination, packaging preference, and target delivery schedule.</p>
            <a class="btn primary" href="#inquiry">Request a Quote</a>
          </div>
        </div>

        <aside class="contact-card" aria-label="YOGIE CORPORATION contact details">
          <div class="office-card">
            <p>Business Office</p>
            <address>
              <strong>YOGIE CORPORATION</strong>
              78-43 267th Street<br>
              Queens, NY 11004, USA
            </address>
          </div>
          <div class="contact-panel">
            <div>
              <h3>Phone Contacts</h3>
              <div class="contact-list">
                ${contacts
                  .map(
                    (contact) => `
                      <a href="tel:+1${contact.phone.replaceAll("-", "")}">
                        <span>${contact.name.charAt(0)}</span>
                        <strong>${contact.name}</strong>
                        <small>${contact.role}</small>
                        <em>${contact.phone}</em>
                      </a>
                    `
                  )
                  .join("")}
              </div>
            </div>
            <div>
              <h3>Email Contacts</h3>
              <div class="email-list">
                ${emails
                  .map(
                    (item) => `
                      <a href="mailto:${item.email}">
                        <span>${item.label}</span>
                        ${item.email}
                      </a>
                    `
                  )
                  .join("")}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>

    <section class="section location-map page" id="location" data-page="location">
      <div class="section-inner map-grid">
        <div>
          <p class="eyebrow">Location</p>
          <h2>Visit or route to the Queens office.</h2>
          <p>YOGIE CORPORATION is based at 78-43 267th Street, Queens, NY 11004, USA.</p>
          <a class="btn primary" href="https://www.google.com/maps/search/?api=1&query=78-43%20267th%20Street%2C%20Queens%2C%20NY%2011004%2C%20USA" target="_blank" rel="noreferrer">Open in Google Maps</a>
        </div>
        <iframe
          title="YOGIE CORPORATION office location"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps?q=78-43%20267th%20Street%2C%20Queens%2C%20NY%2011004%2C%20USA&output=embed">
        </iframe>
      </div>
    </section>
  </main>

  <footer class="footer">
    <p>&copy; 2026 YOGIE CORPORATION. Export & Import Trading.</p>
  </footer>
`;

const navToggle = document.querySelector<HTMLButtonElement>(".nav-toggle");
const navLinks = document.querySelector<HTMLDivElement>(".nav-links");
const pages = document.querySelectorAll<HTMLElement>(".page");
const routeLinks = document.querySelectorAll<HTMLAnchorElement>("a[href^='#']");
const validPages = new Set(["home", "products", "services", "about", "contact", "inquiry", "location"]);

function getCurrentPage() {
  const hash = window.location.hash.replace("#", "");
  return validPages.has(hash) ? hash : "home";
}

function showPage(page: string) {
  document.body.dataset.currentPage = page;

  pages.forEach((section) => {
    section.classList.toggle("active", page === "home" || section.dataset.page === page);
  });

  routeLinks.forEach((link) => {
    const linkPage = link.getAttribute("href")?.replace("#", "");
    link.classList.toggle("active-link", linkPage === page);
  });

  window.scrollTo({ top: 0, behavior: "auto" });
}

navToggle?.addEventListener("click", () => {
  const isOpen = navLinks?.classList.toggle("open") ?? false;
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});

navLinks?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    navLinks.classList.remove("open");
    navToggle?.setAttribute("aria-expanded", "false");
  }
});

window.addEventListener("hashchange", () => {
  showPage(getCurrentPage());
});

document.querySelectorAll<HTMLAnchorElement>(".product-link").forEach((link) => {
  link.addEventListener("click", () => {
    const selectedProduct = link.dataset.product;
    const productSelect = document.querySelector<HTMLSelectElement>("select[name='product']");

    if (selectedProduct && productSelect) {
      productSelect.value = selectedProduct;
    }
  });
});

const form = document.querySelector<HTMLFormElement>("#contact-form");
const status = document.querySelector<HTMLParagraphElement>(".form-status");

form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!status) return;

  const submit = form.querySelector<HTMLButtonElement>("button[type='submit']");
  const payload = Object.fromEntries(new FormData(form).entries());

  status.textContent = "Sending inquiry...";
  status.className = "form-status";
  submit?.setAttribute("disabled", "true");

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = (await response.json()) as { ok: boolean; message?: string; error?: string };

    if (!response.ok || !data.ok) {
      throw new Error(data.error ?? "Unable to send inquiry.");
    }

    status.textContent = data.message ?? "Inquiry sent successfully.";
    status.classList.add("success");
    form.reset();
  } catch (error) {
    status.textContent = error instanceof Error ? error.message : "Unable to send inquiry.";
    status.classList.add("error");
  } finally {
    submit?.removeAttribute("disabled");
  }
});

showPage(getCurrentPage());
