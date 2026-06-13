// ─── SHOPIFY STORE ────────────────────────────────────────────
const SHOPIFY_STORE = 'supplyanddemandllc.myshopify.com';

// Helper: build Shopify product URL
function shopifyUrl(handle) {
  return handle ? `https://${SHOPIFY_STORE}/products/${handle}` : null;
}

// ─── PRODUCT DATA ────────────────────────────────────────────
const PRODUCTS = {
  'closet': {
    name: 'Mirrored Closet Doors', tag: 'Closet Doors',
    desc: 'Full-length mirror panels on smooth bypass track. Brightens any room and makes spaces feel larger.',
    images: [
      {src:'images/mirrored-11.jpg', finish:'White'},
      {src:'images/mirrored-12.jpg', finish:'White'},
      {src:'images/mirrored-13.jpg', finish:'White'},
      {src:'images/mirrored-black-1.jpg', finish:'Black'},
      {src:'images/mirrored-1.jpg', finish:'Black'},
      {src:'images/mirrored-2.jpg', finish:'Black'},
      {src:'images/mirrored-3.jpg', finish:'Black'},
      {src:'images/mirrored-4.jpg', finish:'Black'},
      {src:'images/mirrored-7.jpg', finish:'Black'},
      {src:'images/mirrored-10.jpg', finish:'Black'},
      {src:'images/mirrored-6.jpg', finish:'White'},
    ],
    finishes: ['White', 'Black', 'Bronze', 'Gray', 'Polished Silver', 'Brushed Nickel', 'Satin Brass'],
    widths: ['48"','60"','72"','84"','96"','108"'], heights: ['80"','96"'], custom: true,
    shopifyHandles: {
      'White': 'semi-frame-less-white-mirror-closet-door-set',
      'Black': 'semi-frame-less-black-mirror-closet-door-set',
      'Brushed Nickel': 'semi-frame-less-brushed-nickel-mirror-closet-door-set',
      'Polished Silver': 'semi-frame-less-silver-mirror-closet-door-set',
      'default': 'economy-mirror-closet-door-set'
    }
  },
  'closet-white-glass': {
    name: 'White Glass Closet Doors', tag: 'Closet Doors',
    desc: 'Opaque white glass panels on aluminum track. Clean, modern look — hides contents while letting in soft light.',
    images: [{src:'images/white-glass-2.jpg', finish:'White'},{src:'images/white-glass-3.jpg', finish:'White'},{src:'images/white-glass-4.jpg', finish:'White'},{src:'images/white-glass-1.jpg', finish:'White'},{src:'images/mirrored-5.jpg', finish:'White'}],
    finishes: ['White', 'Black', 'Bronze', 'Gray', 'Polished Silver', 'Brushed Nickel', 'Satin Brass'],
    widths: ['48"','60"','72"','84"','96"','108"'], heights: ['80"','96"'], custom: true
  },
  'closet-frosted': {
    name: 'Frosted Glass Closet Doors', tag: 'Closet Doors',
    desc: 'Sandblasted or acid-etched frosted glass. Diffuses light beautifully and adds a high-end feel to any bedroom.',
    finishes: ['White', 'Black', 'Bronze', 'Gray', 'Polished Silver', 'Brushed Nickel', 'Satin Brass'],
    widths: ['48"','60"','72"','84"','96"','108"'], heights: ['80"','96"'], custom: true
  },
  'closet-frameless': {
    name: 'Frameless Closet Doors', tag: 'Closet Doors',
    desc: 'No frame, no track visible — just clean glass panels. Minimal hardware, sleek finish. Ideal for modern and luxury builds.',
    images: [{src:'images/mirrored-9.jpg', finish:'Brushed Nickel'},{src:'images/mirrored-8.jpg', finish:'Brushed Nickel'}],
    finishes: ['White', 'Black', 'Bronze', 'Gray', 'Polished Silver', 'Brushed Nickel', 'Satin Brass'],
    widths: ['48"','60"','72"','84"','96"','108"'], heights: ['80"','96"'], custom: true
  },
  'closet-economy': {
    name: 'Economy Closet Doors', tag: 'Closet Doors',
    desc: 'Clean panel-style bypass sliding doors. Perfect for rentals, new construction, and high-volume projects.',
    images: ['images/economy-1.jpg','images/economy-2.jpg','images/economy-3.jpg'],
    finishes: ['White', 'Black', 'Bronze', 'Gray', 'Polished Silver', 'Brushed Nickel', 'Satin Brass'],
    widths: ['48"','60"','72"','84"','96"','108"'], heights: ['80"','96"'], custom: true,
    shopifyHandle: 'economy-mirror-closet-door-set'
  },
  'closet-wood': {
    name: 'Wood Closet Doors', tag: 'Closet Doors',
    desc: 'Solid and hollow-core wood panel doors for closets. Available primed or unfinished — ready to stain or paint.',
    finishes: ['White', 'Black', 'Bronze', 'Gray', 'Polished Silver', 'Brushed Nickel', 'Satin Brass'],
    widths: ['48"','60"','72"','84"','96"','108"'], heights: ['80"','96"'], custom: true
  },
  'closet-bifold': {
    name: 'Bifold Closet Doors', tag: 'Closet Doors',
    desc: 'Two-panel bifold on top track. Available in mirrored, louver, and panel styles. Great for tight spaces.',
    finishes: ['White', 'Black', 'Bronze', 'Gray', 'Polished Silver', 'Brushed Nickel', 'Satin Brass'],
    widths: ['48"','60"','72"','84"','96"','108"'], heights: ['80"','96"'], custom: true,
    shopifyHandle: 'vinyl-bifold-closet-doors'
  },
  'shower': {
    name: 'Frameless Shower Door', tag: 'Shower Doors',
    desc: 'Clear tempered glass with no frame. Clean, modern look. Available in chrome, brushed nickel, or matte black hardware.',
    finishes: ['Chrome', 'Brushed Nickel', 'Matte Black'],
    widths: ['28"','30"','32"','34"','36"'], custom: true
  },
  'shower-door-in-panel': {
    name: 'Door and Panel', tag: 'Shower Doors',
    desc: 'Hinged door set within a fixed glass panel. Great for walk-in showers and corner enclosures.',
    finishes: ['Chrome', 'Brushed Nickel', 'Matte Black', 'Oil-Rubbed Bronze'],
    widths: ['48"','54"','60"','72"'], custom: true
  },
  'shower-barn': {
    name: 'Walk-In Barn Door Single Slider', tag: 'Shower Doors',
    desc: 'Single glass panel on exposed sliding hardware. Minimalist barn door aesthetic — perfect for walk-in showers.',
    images: [{src:'images/barn-1.jpg', finish:'Black'}],
    finishes: ['Black', 'Chrome', 'Brushed Nickel', 'Satin Brass'],
    widths: ['60"'], heights: ['76"','80"'], custom: true
  },
  'shower-barn-tub': {
    name: 'Bathtub Barn Door Style Single Slider', tag: 'Shower Doors',
    desc: 'Single glass panel on exposed sliding hardware designed for bathtub enclosures. Clean barn door look for any bathroom.',
    images: [{src:'images/shower-barn-tub-1.jpg', finish:'Matte Black'}],
    finishes: ['Black', 'Chrome', 'Brushed Nickel', 'Satin Brass'],
    widths: ['60"'], heights: ['66"','72"'], custom: true
  },
  'shower-double-walkin': {
    name: 'Walk-In Double Slider', tag: 'Shower Doors',
    desc: 'Two bypass sliding panels designed for walk-in shower openings. Frameless or semi-frameless.',
    finishes: ['Chrome', 'Brushed Nickel', 'Matte Black'],
    widths: ['48"','54"','60"','66"','72"'], custom: true
  },
  'shower-double-tub': {
    name: 'Bathtub Double Slider', tag: 'Shower Doors',
    desc: 'Two bypass sliding glass panels designed for bathtub enclosures. Frameless or semi-frameless.',
    images: [{src:'images/shower-door-panel-1.jpg', finish:'Chrome'},{src:'images/shower-bypass-tub-2.jpg', finish:'Brushed Nickel'}],
    finishes: ['Chrome', 'Brushed Nickel', 'Matte Black'],
    widths: ['48"','54"','60"'], custom: true
  },
  'shower-bypass': {
    name: 'Walk-In Framed Bypass Shower Door', tag: 'Shower Doors',
    desc: 'Classic aluminum frame with two bypass sliding panels for walk-in showers. Durable, easy to maintain.',
    finishes: ['Chrome', 'Brushed Nickel', 'Black', 'Satin Brass'],
    widths: ['48"','54"','60"'], custom: true
  },
  'shower-bypass-tub': {
    name: 'Bathtub Framed Bypass Shower Door', tag: 'Shower Doors',
    desc: 'Classic aluminum frame with two bypass sliding panels designed for bathtub enclosures. Durable, easy to maintain.',
    images: [{src:'images/bypass-tub-1.jpg', finish:'Chrome'}],
    finishes: ['Chrome', 'Brushed Nickel', 'Black', 'Satin Brass'],
    widths: ['48"','54"','60"'], custom: true
  },
  'glass': {
    name: 'Tempered Glass', tag: 'Glass',
    desc: 'Heat-treated safety glass — 4x stronger than standard. Used in doors, shower enclosures, windows, and more. Cut to any size.',
    finishes: ['Clear', 'Tinted', 'Frosted'],
    widths: ['3/16"','1/4"','3/8"','1/2"'], custom: true
  },
  'glass-tabletops': {
    name: 'Glass Table Tops', tag: 'Glass',
    desc: 'Custom-cut tempered glass table tops. Polished edges, rounded corners, any shape or size.',
    images: [{src:'images/glass-tabletop-1.jpg'},{src:'images/glass-tabletop-2.jpg'}],
    finishes: ['Clear', 'Frosted', 'Bronze Tint', 'Grey Tint'],
    widths: ['Round','Square','Rectangle','Custom Shape'], custom: true
  },
  'glass-laminated': {
    name: 'Laminated Glass', tag: 'Glass',
    desc: 'Two glass layers bonded with a PVB interlayer. Stays in place when broken — ideal for skylights, railings, storefronts.',
    finishes: ['Clear', 'Frosted', 'Tinted'],
    widths: ['3/8"','7/16"','1/2"'], custom: true
  },
  'glass-colored': {
    name: 'Colored Glass', tag: 'Glass',
    desc: 'Tinted and colored glass panels for decorative and privacy applications.',
    finishes: ['Bronze','Grey','Green','Blue','Custom Color'],
    widths: ['Custom'], custom: true
  },
  'glass-replacement': {
    name: 'Replacement Glass', tag: 'Glass',
    desc: 'Broken window, door, or cabinet glass? We cut replacement glass to your exact measurements. Fast turnaround.',
    finishes: ['Clear','Frosted','Tempered'],
    widths: ['Single Pane','Dual Pane'], custom: true
  },
  'aluminum': {
    name: 'Single Slider Window', tag: 'Aluminum Windows',
    desc: 'Aluminum frame, single sliding sash. Durable, low maintenance, available in multiple sizes.',
    finishes: ['White','Bronze','Anodized'],
    widths: ['24"×36"','36"×48"','48"×48"','60"×48"'], custom: true
  },
  'aluminum-bifold-kitchen': {
    name: 'Aluminum Bi-Fold Kitchen Window', tag: 'Aluminum Windows',
    desc: 'Pass-through bi-fold window perfect for kitchen counters, bars, and outdoor serving areas.',
    finishes: ['White','Bronze','Anodized'],
    widths: ['36"','48"','60"','72"'], custom: true
  },
  'bifold': {
    name: 'Aluminum Bifold Door', tag: 'Aluminum Bifold Doors',
    desc: 'Durable aluminum frame, white or bronze finish. Perfect for closets, laundry rooms, and pantries.',
    finishes: ['White','Bronze'],
    widths: ['24"','30"','36"','48"'], custom: true,
    shopifyHandle: 'aluminum-folding-door-96-x-80'
  },
  'mirrors': {
    name: 'Vanity Mirror', tag: 'Mirrors',
    desc: 'Standard bathroom and vanity mirrors. Plain or beveled edge, cut to size.',
    finishes: ['Plain Edge','Beveled Edge'],
    widths: ['24"×30"','30"×36"','36"×48"'], custom: true,
    shopifyHandle: 'full-body-vanity-mirror'
  },
  'mirror-vanity-plus': {
    name: 'Vanity Mirror Plus', tag: 'Mirrors',
    desc: 'Upgraded vanity mirror with polished or beveled edges and premium clarity glass.',
    images: [{src:'images/mirror-vanity-lights-1.jpg'}],
    finishes: ['Polished Edge','Beveled Edge','Frameless'],
    widths: ['36"×48"','48"×60"','60"×72"'], custom: true,
    shopifyHandle: 'full-body-vanity-mirror-10-bulb'
  },
  'mirror-gym': {
    name: 'Gym Mirrors', tag: 'Mirrors',
    desc: 'Large-format wall mirrors for home gyms, fitness studios, dance studios, and salons.',
    finishes: ['Plain Edge','Safety-backed'],
    widths: ['48"×72"','60"×84"','72"×84"'], custom: true
  },
  'mirror-custom': {
    name: 'Custom Mirrors', tag: 'Mirrors',
    desc: 'Any shape, any size. Round, arched, irregular cuts — we fabricate to your specs.',
    finishes: ['Plain Edge','Beveled Edge','Framed'],
    widths: ['Custom'], custom: true
  },
  'interior': {
    name: 'Shaker Panel Doors', tag: 'Interior Doors',
    shopifyHandle: 'single-panel-shaker-solid-core-primed-mdf-prehung-interior-door',
    desc: 'Solid core MDF shaker panels. Clean recessed-panel design — fits modern, farmhouse, and transitional interiors.',
    finishes: ['Primed White','Unfinished'],
    widths: ['24"×80"','28"×80"','30"×80"','32"×80"','36"×80"'], custom: false
  }
};
