import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, Bookmark, Check, ChevronDown,
  Compass, Globe2, Heart, MapPin, Menu, Plane, Plus, Search, Sparkles,
  Star, Sun, Users, Wallet, X, Clock3, Mountain, Waves, Utensils, Building2
} from "lucide-react";
import { destinations, imageUrl } from "./data";

const interestsList = ["Food & cafés", "Nature", "Culture", "Adventure", "Hidden gems", "Slow travel"];

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [saved, setSaved] = useState(() => {
    try { return JSON.parse(localStorage.getItem("wanderai-saved") || "[]"); }
    catch { return []; }
  });
  const [savedPlans, setSavedPlans] = useState(() => {
    try { return JSON.parse(localStorage.getItem("wanderai-plans") || "[]"); }
    catch { return []; }
  });
  const [mobileMenu, setMobileMenu] = useState(false);
  const [plannerOpen, setPlannerOpen] = useState(false);
  const [destination, setDestination] = useState("Kyoto, Japan");
  const [days, setDays] = useState("5");
  const [budget, setBudget] = useState("₹50,000 – ₹1,00,000");
  const [travelers, setTravelers] = useState("2");
  const [style, setStyle] = useState("A little bit of everything");
  const [interests, setInterests] = useState(["Food & cafés", "Culture"]);
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState("");

  const filtered = useMemo(() => destinations.filter((place) => {
    const matchesSearch = `${place.name} ${place.country} ${place.category}`.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || place.category === category;
    return matchesSearch && matchesCategory;
  }), [search, category]);

  const toggleSaved = (id) => {
    setSaved((current) => {
      const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
      try { localStorage.setItem("wanderai-saved", JSON.stringify(next)); } catch {}
      return next;
    });
  };

  const saveItinerary = () => {
    if (!itinerary) return;
    const entry = { ...itinerary, id: `${Date.now()}`, destination: destination.trim(), savedAt: new Date().toISOString() };
    setSavedPlans((current) => {
      const next = [entry, ...current].slice(0, 12);
      try { localStorage.setItem("wanderai-plans", JSON.stringify(next)); } catch {}
      return next;
    });
    setNotice("Itinerary saved to your travel desk on this device.");
  };

  const removeSavedPlan = (id) => setSavedPlans((current) => {
    const next = current.filter((plan) => plan.id !== id);
    try { localStorage.setItem("wanderai-plans", JSON.stringify(next)); } catch {}
    return next;
  });

  const downloadItinerary = (plan) => {
    const lines = [plan.title || `${plan.destination || destination} itinerary`, "=".repeat(42), plan.intro || "", `Estimated total: ${plan.estimatedTotal || "Verify locally"}`, ""];
    (plan.days || []).forEach((day) => {
      lines.push(`DAY ${day.day}: ${day.theme}`);
      (day.items || []).forEach((item) => lines.push(`  ${item.time}: ${item.title} — ${item.description}`));
      lines.push("");
    });
    if (plan.tips?.length) lines.push("TRAVEL TIPS", ...plan.tips.map((tip) => `• ${tip}`));
    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${(plan.destination || destination || "wanderai-trip").replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase()}-itinerary.txt`;
    document.body.appendChild(anchor); anchor.click(); anchor.remove(); URL.revokeObjectURL(url);
  };

  const toggleInterest = (interest) => {
    setInterests((current) => current.includes(interest)
      ? current.filter((item) => item !== interest)
      : [...current, interest]);
  };

  async function generatePlan(event) {
    event.preventDefault();
    setLoading(true);
    setNotice("");
    setItinerary(null);
    try {
      const apiBase = import.meta.env.VITE_API_URL || "http://localhost:8787";
      let response;
      try {
        response = await fetch(`${apiBase}/api/plan`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ destination, days: Number(days), budget, travelers: Number(travelers), style, interests })
        });
      } catch {
        response = null;
      }

      if (response?.ok) {
        setItinerary(await response.json());
      } else {
        // A clearly labelled demo itinerary keeps the project interactive without an API key.
        const safeDestination = destination.trim() || "your next destination";
        const dayCount = Number(days);
        const templates = [
          { theme: "Get your bearings", items: [
            { time: "Morning", title: "Start with a local breakfast", description: "Find a well-loved neighborhood café and ease into the day.", type: "food" },
            { time: "Afternoon", title: "Explore the city on foot", description: "Visit a signature landmark, then wander nearby side streets.", type: "activity" },
            { time: "Evening", title: "Chase golden hour", description: "Find a scenic viewpoint and enjoy a relaxed local dinner.", type: "food" }
          ]},
          { theme: "A little culture, a lot of wonder", items: [
            { time: "Morning", title: "Visit a cultural highlight", description: "Choose one meaningful museum, temple, gallery or historic district.", type: "culture" },
            { time: "Afternoon", title: "Take the scenic route", description: "Leave room for independent shops, a market and an unplanned discovery.", type: "activity" },
            { time: "Evening", title: "Taste something regional", description: "Try a local specialty and ask residents what they recommend.", type: "food" }
          ]},
          { theme: "Make it your own", items: [
            { time: "Morning", title: "Get outside", description: "Pick a garden, coastal walk or nature trail that fits your pace.", type: "nature" },
            { time: "Afternoon", title: "Follow your curiosity", description: "Explore a neighborhood connected to your interests: food, design or history.", type: "activity" },
            { time: "Evening", title: "One last memorable moment", description: "Book a special meal or take a slow sunset walk before tomorrow.", type: "food" }
          ]}
        ];
        const plannedDays = Array.from({ length: dayCount }, (_, index) => ({
          day: index + 1,
          theme: templates[index % templates.length].theme,
          items: templates[index % templates.length].items
        }));
        setItinerary({
          title: `${dayCount}-day ${safeDestination} escape`,
          intro: `A flexible starter itinerary for ${travelers} traveler(s), built around ${style.toLowerCase()} and your interests. This is a demo plan, not a live AI response.`,
          estimatedTotal: `${budget} (your selected budget)`,
          days: plannedDays,
          tips: [
            "Check opening hours, local transport and entry requirements before travelling.",
            "Treat cost details as planning guidance; confirm current prices before booking.",
            interests.length ? `Keep space for what you love: ${interests.join(", ")}.` : "Leave some unplanned time for spontaneous discoveries."
          ],
          demoMode: true
        });
        setNotice("Showing a sample demo itinerary. Connect the optional AI API to generate a live personalized plan.");
      }
    } catch (error) {
      setNotice(error.message || "Couldn't generate a plan right now.");
    } finally {
      setLoading(false);
    }
  }

  const categories = ["All", "Culture", "Coast", "Nature", "Adventure", "City"];

  return (
    <div className="app-shell">
      <div className="announcement"><Sparkles size={14} /> Your next great story starts here <span className="announcement-dot">✳</span> Travel smarter with AI</div>
      <header className="navbar">
        <a href="#home" className="brand" aria-label="WanderAI home">
          <span className="brand-mark"><Compass size={21} strokeWidth={2.4} /></span>
          <span>wander<span className="brand-ai">ai</span><span className="brand-period">.</span></span>
        </a>
        <nav className={mobileMenu ? "nav-links nav-open" : "nav-links"}>
          <a href="#explore" onClick={() => setMobileMenu(false)}>Explore</a>
          <a href="#how-it-works" onClick={() => setMobileMenu(false)}>How it works</a>
          <a href="#saved" onClick={() => setMobileMenu(false)}>Saved trips <span className="saved-count">{saved.length}</span></a>
        </nav>
        <div className="nav-actions">
          <button className="nav-login" onClick={() => setPlannerOpen(true)}>Plan a trip <ArrowUpRight size={15}/></button>
          <button className="mobile-menu" aria-label="Toggle menu" onClick={() => setMobileMenu(!mobileMenu)}>{mobileMenu ? <X/> : <Menu/>}</button>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-line"></span> LESS SCROLLING, MORE SOUL-SEARCHING</div>
            <h1>Find your<br/><span className="serif-word">somewhere.</span></h1>
            <p className="hero-description">Big trip energy. Zero planning overwhelm. Discover places that feel like you, with a little help from AI.</p>
            <div className="hero-actions">
              <button className="button-primary" onClick={() => setPlannerOpen(true)}><Sparkles size={17}/> Build my trip <ArrowRight size={16}/></button>
              <a href="#explore" className="text-link">Explore destinations <ArrowDownRight size={16}/></a>
            </div>
            <div className="social-proof">
              <div className="avatar-stack"><span>J</span><span>M</span><span>A</span><span>K</span></div>
              <div><div className="proof-stars"><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/> <b>4.9/5</b></div><p>Loved by curious travelers</p></div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-photo-wrap">
              <img className="hero-photo" src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1400&q=90" alt="Colorful coastal village overlooking the sea" />
              <div className="photo-overlay"></div>
              <div className="photo-location"><span className="location-pin"><MapPin size={15}/></span><div><b>Cinque Terre, Italy</b><small>Somewhere worth getting lost</small></div></div>
              <div className="floating-note note-top"><span className="note-icon"><Sparkles size={16}/></span><div><b>Your kind of adventure</b><small>Handpicked just for you</small></div></div>
              <div className="floating-note note-bottom"><div className="sun-icon"><Sun size={17}/></div><div><b>Golden hour, always</b><small>Memories over checklists</small></div></div>
            </div>
            <div className="hero-stamp"><span>GO</span><span>FEEL</span><span>WONDER</span><ArrowDownRight size={20}/></div>
            <div className="scribble">✳</div>
          </div>
          <div className="hero-bottom-label"><span>01 / 03</span><span className="label-line"></span><span>THE WORLD IS A LITTLE BIGGER THAN YOUR FEED</span></div>
        </section>

        <section className="stats-strip" aria-label="WanderAI highlights">
          <div><Globe2/><strong>12</strong><span>curated destinations</span></div>
          <div><Sparkles/><strong>1 smart planner</strong><span>your taste, your trip</span></div>
          <div><Heart/><strong>100% you</strong><span>not a cookie-cutter itinerary</span></div>
          <div className="stats-note">Made for the <em>beautifully curious.</em></div>
        </section>

        <section className="explore-section section-wrap" id="explore">
          <div className="section-heading">
            <div><div className="eyebrow"><span className="eyebrow-line"></span> YOUR NEXT CHAPTER</div><h2>Places with a <span className="serif-word">pulse.</span></h2></div>
            <p>Not just places to go.<br/>Places that make you <em>feel something.</em></p>
          </div>
          <div className="explore-toolbar">
            <div className="search-box"><Search size={18}/><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Find your somewhere..." aria-label="Search destinations"/></div>
            <div className="category-list">{categories.map((item) => <button key={item} className={category === item ? "category-chip active" : "category-chip"} onClick={() => setCategory(item)}>{item}</button>)}</div>
          </div>
          <div className="destination-grid">
            {filtered.map((place, index) => (
              <motion.article className="destination-card" key={place.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ delay: index * 0.06 }}>
                <div className="destination-image-wrap">
                  <img src={imageUrl(place.image)} alt={`${place.name}, ${place.country}`} loading="lazy"/>
                  <span className="destination-category">{place.category}</span>
                  <button className={saved.includes(place.id) ? "save-button saved" : "save-button"} onClick={() => toggleSaved(place.id)} aria-label={saved.includes(place.id) ? `Remove ${place.name} from saved` : `Save ${place.name}`}><Heart size={17} fill={saved.includes(place.id) ? "currentColor" : "none"}/></button>
                  <span className="image-rating"><Star size={12} fill="currentColor"/> {place.rating}</span>
                </div>
                <div className="destination-info">
                  <div className="destination-title-row"><div><h3>{place.name}</h3><p><MapPin size={13}/>{place.country}</p></div><span className="destination-price">from <b>{place.price}</b></span></div>
                  <p className="destination-description">{place.description}</p>
                  <div className="destination-card-bottom"><span><Clock3 size={14}/>{place.days}</span><button onClick={() => { setDestination(`${place.name}, ${place.country}`); setPlannerOpen(true); }}>Plan this trip <ArrowUpRight size={14}/></button></div>
                </div>
              </motion.article>
            ))}
            {filtered.length === 0 && <div className="empty-state"><Compass size={28}/><h3>No places found (yet)</h3><p>Try a different search or category.</p><button className="text-link" onClick={() => {setSearch("");setCategory("All");}}>Clear filters <ArrowRight size={15}/></button></div>}
          </div>
          <div className="explore-footnote"><span className="footnote-star">✳</span> A little inspiration to get you going. Your adventure is yours to make.</div>
        </section>

        <section className="ai-section" id="how-it-works">
          <div className="ai-decoration deco-one">✳</div><div className="ai-decoration deco-two">✳</div>
          <div className="ai-content">
            <div className="eyebrow eyebrow-light"><span className="eyebrow-line"></span> YOUR TRAVEL BRAINSTORM BUDDY</div>
            <h2>Dream it.<br/><span className="serif-word">We'll map it.</span></h2>
            <p>Tell us what makes your heart skip a beat. Our AI turns your what-ifs into a thoughtful day-by-day plan, made around your budget, pace and kind of wonder.</p>
            <div className="ai-feature-list"><div><span><Check size={14}/></span> Built around your travel style</div><div><span><Check size={14}/></span> Day-by-day ideas, not endless tabs</div><div><span><Check size={14}/></span> Your budget stays in the picture</div></div>
            <button className="button-light" onClick={() => setPlannerOpen(true)}><Sparkles size={17}/> Meet your AI planner <ArrowRight size={16}/></button>
          </div>
          <div className="planner-preview">
            <div className="preview-header"><div className="preview-stars">✳</div><div><b>Your Kyoto escape</b><small>Thoughtfully made for you</small></div><span className="preview-pill">AI CURATED</span></div>
            <div className="preview-map"><img src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=85" alt="Traditional Kyoto street" loading="lazy"/><div className="map-label"><MapPin size={13}/> Kyoto, Japan</div></div>
            <div className="preview-itinerary">
              <div className="preview-day"><span>DAY 01</span><div><b>Find your Kyoto rhythm</b><small>Fushimi Inari · Nishiki Market · Gion at dusk</small></div><ArrowUpRight size={15}/></div>
              <div className="preview-day"><span>DAY 02</span><div><b>A little quiet, a lot of wonder</b><small>Arashiyama · riverside lunch · hidden tea house</small></div><ArrowUpRight size={15}/></div>
              <div className="preview-day"><span>DAY 03</span><div><b>Old souls & new discoveries</b><small>Philosopher's Path · local craft · sunset views</small></div><ArrowUpRight size={15}/></div>
            </div>
            <div className="preview-footer"><span><Sparkles size={14}/> Your plan, your pace.</span><span>Made with care ♡</span></div>
          </div>
        </section>

        <section className="saved-section section-wrap" id="saved">
          <div className="saved-heading"><div><div className="eyebrow"><span className="eyebrow-line"></span> LITTLE PLACES, BIG PLANS</div><h2>Your saved <span className="serif-word">somewheres.</span></h2></div><span className="saved-badge"><Bookmark size={14}/>{saved.length} saved</span></div>
          {saved.length ? <div className="saved-list">{destinations.filter((place) => saved.includes(place.id)).map((place) => <div className="saved-item" key={place.id}><img src={imageUrl(place.image, 220)} alt=""/><div><b>{place.name}</b><span>{place.country} · {place.category}</span></div><button onClick={() => {setDestination(`${place.name}, ${place.country}`);setPlannerOpen(true);}}>Plan trip <ArrowRight size={14}/></button><button className="remove-saved" aria-label={`Remove ${place.name}`} onClick={() => toggleSaved(place.id)}><X size={16}/></button></div>)}</div> : <div className="saved-empty"><div className="saved-empty-icon"><Heart size={23}/></div><div><b>Your travel daydreams live here.</b><p>Tap the heart on any destination to keep it close for later.</p></div><button className="text-link" onClick={() => document.getElementById("explore")?.scrollIntoView({behavior:"smooth"})}>Find a place <ArrowRight size={15}/></button></div>}
          <div className="saved-plans-panel">
            <div className="saved-plans-heading"><div><h3>Your saved itineraries</h3><p>Plans are stored on this device, ready when you are.</p></div><span>{savedPlans.length}/12 plans</span></div>
            {savedPlans.length ? <div className="saved-plan-grid">{savedPlans.map((plan) => <article className="saved-plan-card" key={plan.id}><div className="saved-plan-top"><span><Sparkles size={13}/> {plan.demoMode ? "SAMPLE PLAN" : "AI PLAN"}</span><button className="remove-saved" aria-label={`Delete ${plan.title}`} onClick={() => removeSavedPlan(plan.id)}><X size={15}/></button></div><h4>{plan.title || plan.destination}</h4><p>{plan.days?.length || 0} days · {plan.estimatedTotal || "Budget not set"}</p><div className="saved-plan-actions"><button onClick={() => downloadItinerary(plan)}><ArrowDownRight size={14}/> Export .txt</button><button onClick={() => {setDestination(plan.destination || destination);setItinerary(plan);setPlannerOpen(true);}}>Open plan <ArrowUpRight size={14}/></button></div></article>)}</div> : <div className="saved-plans-empty"><Bookmark size={17}/><span>Generate an itinerary and choose <b>Save itinerary</b> to build your personal trip library.</span></div>}
          </div>
        </section>

        <section className="final-cta">
          <div className="cta-spark">✳</div><div className="eyebrow"><span className="eyebrow-line"></span> YOUR PASSPORT IS CALLING</div>
          <h2>The world won't<br/> <span className="serif-word">see itself.</span></h2>
          <p>Less planning rabbit hole. More “remember that time?”</p>
          <button className="button-primary" onClick={() => setPlannerOpen(true)}><Sparkles size={17}/> Let's make a trip <ArrowRight size={16}/></button>
          <div className="cta-bottom">GO SOMEWHERE GOOD <span>✳</span> COME BACK DIFFERENT</div>
        </section>
      </main>

      <footer className="footer"><a href="#home" className="brand"><span className="brand-mark"><Compass size={19}/></span><span>wander<span className="brand-ai">ai</span><span className="brand-period">.</span></span></a><p>Made for the beautifully curious.</p><div className="footer-right"><span>© 2026 WanderAI</span><a href="#how-it-works">Made with a little AI magic ✳</a></div></footer>

      <AnimatePresence>
        {plannerOpen && <motion.div className="modal-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onMouseDown={(e) => {if(e.target === e.currentTarget) setPlannerOpen(false);}}>
          <motion.div className="planner-modal" role="dialog" aria-modal="true" aria-labelledby="planner-title" initial={{opacity:0,y:22,scale:.98}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:12,scale:.98}} transition={{duration:.22}}>
            <div className="modal-top"><div className="modal-icon"><Sparkles size={20}/></div><button className="modal-close" aria-label="Close planner" onClick={() => setPlannerOpen(false)}><X size={20}/></button></div>
            <div className="modal-eyebrow">A TRIP THAT FEELS LIKE YOU</div><h2 id="planner-title">Let's make some <span className="serif-word">memories.</span></h2><p className="modal-intro">A few details. A little imagination. Your next adventure starts here.</p>
            <form onSubmit={generatePlan}>
              <label className="field-label">Where are we going?</label><div className="field-with-icon"><MapPin size={17}/><input required value={destination} onChange={(e)=>setDestination(e.target.value)} placeholder="e.g. Kyoto, Japan"/></div>
              <div className="form-two-col"><div><label className="field-label">How long?</label><div className="select-wrap"><select value={days} onChange={(e)=>setDays(e.target.value)}><option value="2">Weekend · 2 days</option><option value="3">3 days</option><option value="5">5 days</option><option value="7">A full week · 7 days</option><option value="10">10 days</option><option value="14">Two weeks · 14 days</option></select><ChevronDown size={15}/></div></div><div><label className="field-label">Travelers</label><div className="select-wrap"><Users size={16}/><select value={travelers} onChange={(e)=>setTravelers(e.target.value)}><option value="1">Just me</option><option value="2">2 travelers</option><option value="3">3 travelers</option><option value="4">4 travelers</option><option value="5">5+ travelers</option></select><ChevronDown size={15}/></div></div></div>
              <label className="field-label">What's your budget? <span className="field-optional">for the whole trip</span></label><div className="select-wrap full-select"><Wallet size={16}/><select value={budget} onChange={(e)=>setBudget(e.target.value)}><option>Under ₹25,000</option><option>₹25,000 – ₹50,000</option><option>₹50,000 – ₹1,00,000</option><option>₹1,00,000+</option><option>Flexible / surprise me</option></select><ChevronDown size={15}/></div>
              <label className="field-label">Your kind of trip</label><div className="select-wrap full-select"><Compass size={16}/><select value={style} onChange={(e)=>setStyle(e.target.value)}><option>A little bit of everything</option><option>Slow & soulful</option><option>Adventure packed</option><option>Foodie trail</option><option>Culture & history</option><option>Luxury & comfort</option><option>Budget explorer</option></select><ChevronDown size={15}/></div>
              <label className="field-label">What makes you feel alive?</label><div className="interest-chips">{interestsList.map((interest)=> <button type="button" key={interest} className={interests.includes(interest)?"interest-chip selected":"interest-chip"} onClick={()=>toggleInterest(interest)}>{interests.includes(interest)&&<Check size={12}/>} {interest}</button>)}</div>
              <button className="button-primary generate-button" type="submit" disabled={loading}>{loading ? <><span className="spinner"/> Dreaming up your trip...</> : <><Sparkles size={17}/> Generate my itinerary <ArrowRight size={16}/></>}</button>
            </form>
            {notice && <div className="notice-message"><b>Almost there</b><p>{notice}</p><small>See README.md for setup instructions. Demo mode is available without an API key.</small></div>}
            {itinerary && <div className="itinerary-result"><div className="result-kicker"><Sparkles size={14}/> {itinerary.demoMode ? "YOUR DEMO ITINERARY" : "YOUR AI-GENERATED ITINERARY"}</div><h3>{itinerary.title || `${destination} escape`}</h3><p>{itinerary.intro}</p><div className="result-budget"><Wallet size={15}/> Estimated trip total: <b>{itinerary.estimatedTotal || "Check local prices"}</b></div>{(itinerary.days || []).map((day)=><div className="result-day" key={day.day}><span>DAY {day.day}</span><div><b>{day.theme}</b>{(day.items||[]).map((item,i)=><p key={i}><strong>{item.time}</strong> · {item.title} — {item.description}</p>)}</div></div>)}{itinerary.tips?.length>0&&<div className="result-tips"><b>A few thoughtful tips</b>{itinerary.tips.map((tip,i)=><p key={i}>✳ {tip}</p>)}</div>}<button className="button-outline" onClick={saveItinerary}><Bookmark size={15}/> Save itinerary</button><button className="button-outline" onClick={()=>downloadItinerary(itinerary)}><ArrowDownRight size={15}/> Export itinerary (.txt)</button><button className="button-outline" onClick={()=>{navigator.clipboard?.writeText(JSON.stringify(itinerary,null,2));setNotice("Itinerary copied as JSON (if clipboard access is allowed).");}}><Plus size={15}/> Copy as JSON</button></div>}
            <div className="modal-disclaimer">✳ AI-made inspiration, not live bookings. Always verify details before you go.</div>
          </motion.div>
        </motion.div>}
      </AnimatePresence>
    </div>
  );
}

export default App;
