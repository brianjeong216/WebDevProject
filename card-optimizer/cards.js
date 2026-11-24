/*
 * Card data for the Card Optimizer.
 *
 * Earn rates are based on public issuer info as of 2026. Issuers change these
 * often, so double-check before relying on them and edit this file as needed.
 *
 * How a card is described:
 *   earn:      { categoryId: multiplier }   (anything not listed earns `base`)
 *   merchants: { merchantId: multiplier }   (overrides the category for that merchant)
 *   caps:      { categoryId: "text" }       (spending caps shown as a warning)
 *   portal:    "text"                       (bonus only when booking through the issuer's travel site)
 *   pool:      [cardIds]                    (points are only worth full value if you also hold one of these)
 *   closedLoop: merchantId                  (store card that only works at that merchant)
 *   special:   "rotating" | "customCash"    (user-configured 5% categories)
 */
(function () {
  const TRAVEL = ["flights", "hotels", "car_rental", "travel_other", "transit"];
  const all = (cats, rate) => Object.fromEntries(cats.map((c) => [c, rate]));

  const currencies = {
    UR:   { name: "Chase Ultimate Rewards", unit: "pts", cpp: 1.5 },
    MR:   { name: "Amex Membership Rewards", unit: "pts", cpp: 1.5 },
    TY:   { name: "Citi ThankYou Points", unit: "pts", cpp: 1.5 },
    C1:   { name: "Capital One Miles", unit: "miles", cpp: 1.5 },
    BILT: { name: "Bilt Points", unit: "pts", cpp: 1.5 },
    WF:   { name: "Wells Fargo Rewards", unit: "pts", cpp: 1.0 },
    USB:  { name: "U.S. Bank Points", unit: "pts", cpp: 1.0 },
    CASH: { name: "Cash back", unit: "%", cpp: 1.0 },
  };

  const categories = [
    { id: "dining", label: "Dining", icon: "🍽️", keywords: "restaurant food cafe coffee bar pub fast food takeout delivery eat lunch dinner breakfast" },
    { id: "groceries", label: "Groceries", icon: "🛒", keywords: "grocery supermarket market food store" },
    { id: "online_grocery", label: "Online grocery", icon: "📦", keywords: "grocery delivery instacart online grocery" },
    { id: "wholesale", label: "Warehouse club", icon: "🏬", keywords: "warehouse wholesale club bulk" },
    { id: "superstore", label: "Superstore", icon: "🏪", keywords: "superstore department store big box" },
    { id: "gas", label: "Gas", icon: "⛽", keywords: "gas fuel petrol station" },
    { id: "ev", label: "EV charging", icon: "🔌", keywords: "ev electric charging charger supercharger" },
    { id: "flights", label: "Flights", icon: "✈️", keywords: "flight airline airfare plane" },
    { id: "hotels", label: "Hotels", icon: "🏨", keywords: "hotel motel resort lodging stay" },
    { id: "car_rental", label: "Car rental", icon: "🚗", keywords: "car rental rent a car" },
    { id: "travel_other", label: "Other travel", icon: "🧳", keywords: "travel vacation rental cruise travel agency booking" },
    { id: "transit", label: "Transit & rideshare", icon: "🚕", keywords: "rideshare taxi train subway metro bus parking toll transit commute" },
    { id: "streaming", label: "Streaming", icon: "📺", keywords: "streaming subscription music video tv" },
    { id: "drugstore", label: "Drugstore", icon: "💊", keywords: "drugstore pharmacy medicine" },
    { id: "online_retail", label: "Online shopping", icon: "🛍️", keywords: "online shopping retail ecommerce" },
    { id: "entertainment", label: "Entertainment", icon: "🎟️", keywords: "movie cinema concert tickets sports theme park show theater bowling" },
    { id: "home_improvement", label: "Home improvement", icon: "🔨", keywords: "home improvement hardware tools" },
    { id: "fitness", label: "Gym & fitness", icon: "🏋️", keywords: "gym fitness workout" },
    { id: "phone", label: "Phone & internet", icon: "📱", keywords: "phone cell wireless internet bill" },
    { id: "rent", label: "Rent", icon: "🏠", keywords: "rent apartment landlord housing" },
    { id: "other", label: "Everything else", icon: "💳", keywords: "other general everyday misc" },
  ];

  const cards = [
    {
      id: "csp", name: "Sapphire Preferred", issuer: "Chase", network: "visa", currency: "UR", fee: 95,
      color: ["#1b3a6b", "#2d5fa3"], base: 1,
      earn: { dining: 3, online_grocery: 3, streaming: 3, ...all(TRAVEL, 2) },
      portal: "5x on travel booked through Chase Travel",
    },
    {
      id: "csr", name: "Sapphire Reserve", issuer: "Chase", network: "visa", currency: "UR", fee: 795,
      color: ["#0e1b2e", "#2a3d5c"], base: 1,
      earn: { dining: 3, flights: 4, hotels: 4 },
      notes: ["4x flights and hotels only when booked directly"],
      portal: "8x on travel booked through Chase Travel",
    },
    {
      id: "cfu", name: "Freedom Unlimited", issuer: "Chase", network: "visa", currency: "UR", fee: 0,
      color: ["#2b6cb0", "#4a90d9"], base: 1.5,
      earn: { dining: 3, drugstore: 3 },
      pool: ["csp", "csr"],
      portal: "5x on travel booked through Chase Travel",
    },
    {
      id: "cff", name: "Freedom Flex", issuer: "Chase", network: "mastercard", currency: "UR", fee: 0,
      color: ["#1f7a8c", "#3fb0c4"], base: 1,
      earn: { dining: 3, drugstore: 3 },
      special: "rotating", rotatingRate: 5, rotatingCap: "5x up to $1,500/quarter in rotating categories (activate each quarter)",
      pool: ["csp", "csr"],
      portal: "5x on travel booked through Chase Travel",
    },
    {
      id: "amex_gold", name: "Gold Card", issuer: "Amex", network: "amex", currency: "MR", fee: 325,
      color: ["#a67c2e", "#d8b25c"], base: 1,
      earn: { dining: 4, groceries: 4, flights: 3 },
      caps: { dining: "4x up to $50k/yr", groceries: "4x at U.S. supermarkets up to $25k/yr" },
      notes: ["3x flights when booked directly with the airline or AmexTravel"],
      portal: "2x on prepaid hotels via AmexTravel",
    },
    {
      id: "amex_plat", name: "Platinum Card", issuer: "Amex", network: "amex", currency: "MR", fee: 895,
      color: ["#8e9aa6", "#c9d1d9"], base: 1,
      earn: { flights: 5 },
      caps: { flights: "5x on flights booked directly (up to $500k/yr)" },
      portal: "5x on prepaid hotels via AmexTravel",
    },
    {
      id: "amex_bcp", name: "Blue Cash Preferred", issuer: "Amex", network: "amex", currency: "CASH", fee: 95,
      color: ["#3a7bd5", "#6fb1fc"], base: 1,
      earn: { groceries: 6, streaming: 6, transit: 3, gas: 3 },
      caps: { groceries: "6% at U.S. supermarkets up to $6k/yr, then 1%" },
    },
    {
      id: "amex_bce", name: "Blue Cash Everyday", issuer: "Amex", network: "amex", currency: "CASH", fee: 0,
      color: ["#4f9de0", "#9ccaf2"], base: 1,
      earn: { groceries: 3, online_retail: 3, gas: 3 },
      caps: { groceries: "3% up to $6k/yr", online_retail: "3% up to $6k/yr", gas: "3% up to $6k/yr" },
    },
    {
      id: "venture_x", name: "Venture X", issuer: "Capital One", network: "visa", currency: "C1", fee: 395,
      color: ["#1c1c1c", "#3d3d3d"], base: 2,
      earn: {},
      portal: "10x hotels & rental cars, 5x flights via Capital One Travel",
    },
    {
      id: "venture", name: "Venture", issuer: "Capital One", network: "visa", currency: "C1", fee: 95,
      color: ["#5b2a86", "#8a4fbf"], base: 2,
      earn: {},
      portal: "5x hotels & rental cars via Capital One Travel",
    },
    {
      id: "savor", name: "Savor", issuer: "Capital One", network: "mastercard", currency: "CASH", fee: 0,
      color: ["#7a2e2e", "#b5524a"], base: 1,
      earn: { dining: 3, entertainment: 3, streaming: 3, groceries: 3 },
      notes: ["Grocery 3% excludes superstores like Walmart and Target"],
    },
    {
      id: "citi_dc", name: "Double Cash", issuer: "Citi", network: "mastercard", currency: "TY", fee: 0,
      color: ["#00487a", "#0072bc"], base: 2,
      earn: {},
      pool: ["citi_premier"],
    },
    {
      id: "citi_cc", name: "Custom Cash", issuer: "Citi", network: "mastercard", currency: "TY", fee: 0,
      color: ["#006b6b", "#00a3a3"], base: 1,
      earn: {},
      special: "customCash",
      customCashOptions: ["dining", "gas", "groceries", "flights", "hotels", "transit", "streaming", "drugstore", "home_improvement", "fitness", "entertainment"],
      rotatingCap: "5% on your top category up to $500/billing cycle",
      pool: ["citi_premier"],
    },
    {
      id: "citi_premier", name: "Strata Premier", issuer: "Citi", network: "mastercard", currency: "TY", fee: 95,
      color: ["#002d4f", "#1c5b8c"], base: 1,
      earn: { flights: 3, hotels: 3, dining: 3, groceries: 3, gas: 3, ev: 3 },
      portal: "10x hotels, car rentals & attractions via Citi Travel",
    },
    {
      id: "wf_active", name: "Active Cash", issuer: "Wells Fargo", network: "visa", currency: "CASH", fee: 0,
      color: ["#b31b1b", "#e0473c"], base: 2,
      earn: {},
    },
    {
      id: "wf_autograph", name: "Autograph", issuer: "Wells Fargo", network: "visa", currency: "WF", fee: 0,
      color: ["#3b1f4a", "#6c3d85"], base: 1,
      earn: { dining: 3, ...all(TRAVEL, 3), gas: 3, ev: 3, streaming: 3, phone: 3 },
    },
    {
      id: "discover", name: "Discover it Cash Back", issuer: "Discover", network: "discover", currency: "CASH", fee: 0,
      color: ["#e55b13", "#f7934c"], base: 1,
      earn: {},
      special: "rotating", rotatingRate: 5, rotatingCap: "5% up to $1,500/quarter in rotating categories (activate each quarter)",
    },
    {
      id: "bilt", name: "Bilt Mastercard", issuer: "Bilt", network: "mastercard", currency: "BILT", fee: 0,
      color: ["#111111", "#444444"], base: 1,
      earn: { rent: 1, dining: 3, ...all(TRAVEL, 2) },
      notes: ["Rent with no transaction fee", "Bilt revamped its card lineup in 2026; verify current rates"],
    },
    {
      id: "apple", name: "Apple Card", issuer: "Goldman Sachs", network: "mastercard", currency: "CASH", fee: 0,
      color: ["#d9d9d9", "#f5f5f5"], dark: true, base: 2,
      earn: {},
      merchants: { apple: 3, uber: 3, uber_eats: 3, walgreens: 3, nike: 3, tmobile: 3, exxon: 3, mobil: 3, panera: 3, ace: 3 },
      notes: ["2% requires Apple Pay; physical card earns 1%"],
    },
    {
      id: "prime_visa", name: "Prime Visa", issuer: "Chase", network: "visa", currency: "CASH", fee: 0,
      color: ["#232f3e", "#37475a"], base: 1,
      earn: { dining: 2, gas: 2, transit: 2 },
      merchants: { amazon: 5, whole_foods: 5 },
      notes: ["5% at Amazon/Whole Foods requires a Prime membership"],
      portal: "5% on travel booked through Chase Travel",
    },
    {
      id: "costco_visa", name: "Costco Anywhere Visa", issuer: "Citi", network: "visa", currency: "CASH", fee: 0,
      color: ["#005daa", "#e31837"], base: 1,
      earn: { gas: 4, ev: 4, dining: 3, flights: 3, hotels: 3, car_rental: 3, travel_other: 3 },
      merchants: { costco: 2, costco_gas: 5 },
      caps: { gas: "4–5% on gas/EV up to $7k/yr combined, then 1%" },
      notes: ["Requires a Costco membership; rewards paid once a year"],
    },
    {
      id: "target_circle", name: "Target Circle Card", issuer: "Target", network: "target", currency: "CASH", fee: 0,
      color: ["#cc0000", "#ff3333"], base: 0,
      earn: {},
      merchants: { target: 5 },
      closedLoop: "target",
      notes: ["Only works at Target; 5% is taken off at checkout"],
    },
    {
      id: "usb_altitude_go", name: "Altitude Go", issuer: "U.S. Bank", network: "visa", currency: "USB", fee: 0,
      color: ["#0c2074", "#2f4ab0"], base: 1,
      earn: { dining: 4, groceries: 2, streaming: 2, gas: 2, ev: 2 },
      caps: { dining: "4x up to $2k/quarter" },
    },
  ];

  // Merchants: name, search aliases, category, and optional accepted networks.
  const merchants = [
    { id: "amazon", name: "Amazon", aliases: "amazon.com amzn", category: "online_retail" },
    { id: "whole_foods", name: "Whole Foods", aliases: "whole foods market wfm", category: "groceries" },
    { id: "target", name: "Target", aliases: "target", category: "superstore" },
    { id: "walmart", name: "Walmart", aliases: "walmart wal-mart", category: "superstore" },
    { id: "costco", name: "Costco", aliases: "costco wholesale", category: "wholesale", networks: ["visa"], networkNote: "Costco warehouses only accept Visa credit cards" },
    { id: "costco_gas", name: "Costco Gas", aliases: "costco gas station fuel", category: "gas", networks: ["visa"], networkNote: "Costco gas only accepts Visa credit cards" },
    { id: "sams", name: "Sam's Club", aliases: "sams club sam's", category: "wholesale" },
    { id: "bjs", name: "BJ's Wholesale", aliases: "bjs bj's", category: "wholesale" },
    { id: "starbucks", name: "Starbucks", aliases: "starbucks coffee", category: "dining" },
    { id: "mcdonalds", name: "McDonald's", aliases: "mcdonalds mcdonald's", category: "dining" },
    { id: "chipotle", name: "Chipotle", aliases: "chipotle", category: "dining" },
    { id: "chickfila", name: "Chick-fil-A", aliases: "chick-fil-a chick fil a chickfila", category: "dining" },
    { id: "panera", name: "Panera Bread", aliases: "panera", category: "dining" },
    { id: "cafe_rio", name: "Cafe Rio", aliases: "cafe rio", category: "dining" },
    { id: "doordash", name: "DoorDash", aliases: "doordash door dash", category: "dining" },
    { id: "uber_eats", name: "Uber Eats", aliases: "uber eats ubereats", category: "dining" },
    { id: "grubhub", name: "Grubhub", aliases: "grubhub", category: "dining" },
    { id: "uber", name: "Uber", aliases: "uber ride", category: "transit" },
    { id: "lyft", name: "Lyft", aliases: "lyft", category: "transit" },
    { id: "kroger", name: "Kroger", aliases: "kroger", category: "groceries" },
    { id: "smiths", name: "Smith's", aliases: "smiths smith's food and drug", category: "groceries" },
    { id: "safeway", name: "Safeway", aliases: "safeway", category: "groceries" },
    { id: "trader_joes", name: "Trader Joe's", aliases: "trader joes trader joe's", category: "groceries" },
    { id: "publix", name: "Publix", aliases: "publix", category: "groceries" },
    { id: "heb", name: "H-E-B", aliases: "heb h-e-b", category: "groceries" },
    { id: "albertsons", name: "Albertsons", aliases: "albertsons", category: "groceries" },
    { id: "aldi", name: "Aldi", aliases: "aldi", category: "groceries" },
    { id: "wegmans", name: "Wegmans", aliases: "wegmans", category: "groceries" },
    { id: "winco", name: "WinCo Foods", aliases: "winco", category: "groceries" },
    { id: "instacart", name: "Instacart", aliases: "instacart", category: "online_grocery" },
    { id: "shell", name: "Shell", aliases: "shell", category: "gas" },
    { id: "chevron", name: "Chevron", aliases: "chevron", category: "gas" },
    { id: "exxon", name: "Exxon", aliases: "exxon esso", category: "gas" },
    { id: "mobil", name: "Mobil", aliases: "mobil", category: "gas" },
    { id: "bp", name: "BP", aliases: "bp", category: "gas" },
    { id: "maverik", name: "Maverik", aliases: "maverik", category: "gas" },
    { id: "speedway", name: "Speedway", aliases: "speedway", category: "gas" },
    { id: "tesla_sc", name: "Tesla Supercharger", aliases: "tesla supercharger", category: "ev" },
    { id: "chargepoint", name: "ChargePoint", aliases: "chargepoint", category: "ev" },
    { id: "cvs", name: "CVS", aliases: "cvs pharmacy", category: "drugstore" },
    { id: "walgreens", name: "Walgreens", aliases: "walgreens", category: "drugstore" },
    { id: "netflix", name: "Netflix", aliases: "netflix", category: "streaming" },
    { id: "spotify", name: "Spotify", aliases: "spotify", category: "streaming" },
    { id: "disney_plus", name: "Disney+", aliases: "disney plus disney+", category: "streaming" },
    { id: "hulu", name: "Hulu", aliases: "hulu", category: "streaming" },
    { id: "youtube", name: "YouTube Premium", aliases: "youtube premium youtube tv", category: "streaming" },
    { id: "max", name: "Max (HBO)", aliases: "hbo max", category: "streaming" },
    { id: "apple", name: "Apple", aliases: "apple store app store itunes icloud", category: "online_retail" },
    { id: "nike", name: "Nike", aliases: "nike", category: "other" },
    { id: "best_buy", name: "Best Buy", aliases: "best buy bestbuy", category: "other" },
    { id: "home_depot", name: "Home Depot", aliases: "home depot homedepot", category: "home_improvement" },
    { id: "lowes", name: "Lowe's", aliases: "lowes lowe's", category: "home_improvement" },
    { id: "ace", name: "Ace Hardware", aliases: "ace hardware", category: "home_improvement" },
    { id: "delta", name: "Delta Air Lines", aliases: "delta airlines", category: "flights" },
    { id: "united", name: "United Airlines", aliases: "united airlines", category: "flights" },
    { id: "american", name: "American Airlines", aliases: "american airlines aa", category: "flights" },
    { id: "southwest", name: "Southwest Airlines", aliases: "southwest", category: "flights" },
    { id: "marriott", name: "Marriott", aliases: "marriott", category: "hotels" },
    { id: "hilton", name: "Hilton", aliases: "hilton", category: "hotels" },
    { id: "hyatt", name: "Hyatt", aliases: "hyatt", category: "hotels" },
    { id: "ihg", name: "IHG / Holiday Inn", aliases: "ihg holiday inn", category: "hotels" },
    { id: "airbnb", name: "Airbnb", aliases: "airbnb", category: "travel_other" },
    { id: "hertz", name: "Hertz", aliases: "hertz", category: "car_rental" },
    { id: "enterprise", name: "Enterprise", aliases: "enterprise rent-a-car", category: "car_rental" },
    { id: "amtrak", name: "Amtrak", aliases: "amtrak", category: "transit" },
    { id: "amc", name: "AMC Theatres", aliases: "amc movie theater", category: "entertainment" },
    { id: "ticketmaster", name: "Ticketmaster", aliases: "ticketmaster", category: "entertainment" },
    { id: "verizon", name: "Verizon", aliases: "verizon", category: "phone" },
    { id: "att", name: "AT&T", aliases: "at&t att", category: "phone" },
    { id: "tmobile", name: "T-Mobile", aliases: "t-mobile tmobile", category: "phone" },
    { id: "planet_fitness", name: "Planet Fitness", aliases: "planet fitness", category: "fitness" },
    { id: "ebay", name: "eBay", aliases: "ebay", category: "online_retail" },
    { id: "etsy", name: "Etsy", aliases: "etsy", category: "online_retail" },
  ];

  window.CARD_DATA = { currencies, categories, cards, merchants };
})();
