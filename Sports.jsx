import React, { useEffect, useMemo, useState } from "react";

// Self-contained version (no external UI libs) â€” drop this into src/App.jsx

// ---------------------- small helpers ----------------------
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }, [key, value]);
  return [value, setValue];
}

function Modal({ isOpen, title, children, onClose }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-2xl p-6"> 
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button className="text-gray-600" onClick={onClose}>âœ–</button>
        </div>
        {children}
      </div>
    </div>
  );
}

// ---------------------- seed data ----------------------
const seedCoaches = [
  { id: 1, name: "ظƒط§ط¨طھظ† ط£ط­ظ…ط¯", sport: "ط³ط¨ط§ط­ط©", phone: "+20 100 111 2222", rating: 4.8, bio: "ط®ط¨ط±ط© 10 ط³ظ†ظˆط§طھ ظ…ط¹ ظپط±ظ‚ ط§ظ„ظ†ط§ط´ط¦ظٹظ†.", image: "" },
  { id: 2, name: "ظƒط§ط¨طھظ† ط³ظ„ظ…ظ‰", sport: "ظƒط±ط© ط³ظ„ط©", phone: "+20 120 333 4444", rating: 4.6, bio: "ظ…طھط®طµطµط© ظپظٹ طھط·ظˆظٹط± ط§ظ„ظ…ظ‡ط§ط±ط§طھ ط§ظ„ظپط±ط¯ظٹط©.", image: "" },
];

const seedCourses = [
  { id: 1, title: "ط£ط³ط§ط³ظٹط§طھ ط§ظ„ط³ط¨ط§ط­ط©", sport: "ط³ط¨ط§ط­ط©", level: "ظ…ط¨طھط¯ط¦", price: 3000, durationWeeks: 8, seats: 20, enrolled: 12 },
];

const seedPlayers = [
  { id: 1, name: "ظ…ط­ظ…ط¯ ط±ط¶ط§", age: 16, sport: "ط³ط¨ط§ط­ط©", team: "Power Sharks", guardian: "ط±ط¶ط§ ظ…ط­ظ…ط¯", phone: "+20 101 777 8888", image: "" },
];

const seedMatches = [
  { id: 1, title: "Power Sharks vs Blue Waves", date: "2025-09-10", location: "ط§ظ„ظ‚ط§ظ‡ط±ط©", status: "ظ‚ط§ط¯ظ…ط©" },
];

// ---------------------- forms ----------------------
function CoachForm({ initial = null, onSave, onCancel }) {
  const [name, setName] = useState(initial?.name || "");
  const [sport, setSport] = useState(initial?.sport || "");
  const [phone, setPhone] = useState(initial?.phone || "");
  const [bio, setBio] = useState(initial?.bio || "");
  const [image, setImage] = useState(initial?.image || "");

  const handleFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => setImage(r.result);
    r.readAsDataURL(f);
  };

  const submit = () => {
    if (!name || !sport) return alert('ط§ط¯ط®ظ„ ط§ظ„ط§ط³ظ… ظˆط§ظ„ط±ظٹط§ط¶ط©');
    onSave({ id: initial?.id || Date.now(), name, sport, phone, bio, image, rating: initial?.rating || 4.5 });
  };

  return (
    <div className="space-y-3">
      <label className="block">ط§ط³ظ… ط§ظ„ظƒط§ط¨طھظ†<input className="w-full border p-2 rounded mt-1" value={name} onChange={e=>setName(e.target.value)} /></label>
      <label className="block">ط§ظ„ط±ظٹط§ط¶ط©<input className="w-full border p-2 rounded mt-1" value={sport} onChange={e=>setSport(e.target.value)} /></label>
      <label className="block">ط§ظ„ظ‡ط§طھظپ<input className="w-full border p-2 rounded mt-1" value={phone} onChange={e=>setPhone(e.target.value)} /></label>
      <label className="block">ظ†ط¨ط°ط©<textarea className="w-full border p-2 rounded mt-1" value={bio} onChange={e=>setBio(e.target.value)} /></label>
      <div className="flex items-center gap-3">
        <input type="file" accept="image/*" onChange={handleFile} />
        {image && <img src={image} alt="preview" className="w-16 h-16 object-cover rounded" />}
      </div>
      <div className="flex gap-2 justify-end">
        <button className="bg-gray-200 px-3 py-1 rounded" onClick={onCancel}>ط¥ظ„ط؛ط§ط،</button>
        <button className="bg-green-600 text-white px-3 py-1 rounded" onClick={submit}>ط­ظپط¸</button>
      </div>
    </div>
  );
}

function PlayerForm({ initial = null, onSave, onCancel }) {
  const [name, setName] = useState(initial?.name || "");
  const [age, setAge] = useState(initial?.age || "");
  const [sport, setSport] = useState(initial?.sport || "");
  const [team, setTeam] = useState(initial?.team || "");
  const [guardian, setGuardian] = useState(initial?.guardian || "");
  const [phone, setPhone] = useState(initial?.phone || "");
  const [image, setImage] = useState(initial?.image || "");

  const handleFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => setImage(r.result);
    r.readAsDataURL(f);
  };

  const submit = () => {
    if (!name) return alert('ط§ط¯ط®ظ„ ط§ط³ظ… ط§ظ„ظ„ط§ط¹ط¨');
    onSave({ id: initial?.id || Date.now(), name, age: +age || 0, sport, team, guardian, phone, image });
  };

  return (
    <div className="space-y-3">
      <label className="block">ط§ط³ظ… ط§ظ„ظ„ط§ط¹ط¨<input className="w-full border p-2 rounded mt-1" value={name} onChange={e=>setName(e.target.value)} /></label>
      <div className="grid grid-cols-2 gap-2">
        <label>ط§ظ„ط¹ظ…ط±<input className="w-full border p-2 rounded mt-1" value={age} onChange={e=>setAge(e.target.value)} /></label>
        <label>ط§ظ„ط±ظٹط§ط¶ط©<input className="w-full border p-2 rounded mt-1" value={sport} onChange={e=>setSport(e.target.value)} /></label>
      </div>
      <label className="block">ط§ظ„ظپط±ظٹظ‚<input className="w-full border p-2 rounded mt-1" value={team} onChange={e=>setTeam(e.target.value)} /></label>
      <label className="block">ط§ط³ظ… ظˆظ„ظٹ ط§ظ„ط£ظ…ط±<input className="w-full border p-2 rounded mt-1" value={guardian} onChange={e=>setGuardian(e.target.value)} /></label>
      <label className="block">ط§ظ„ظ‡ط§طھظپ<input className="w-full border p-2 rounded mt-1" value={phone} onChange={e=>setPhone(e.target.value)} /></label>
      <div className="flex items-center gap-3">
        <input type="file" accept="image/*" onChange={handleFile} />
        {image && <img src={image} alt="preview" className="w-16 h-16 object-cover rounded" />}
      </div>
      <div className="flex gap-2 justify-end">
        <button className="bg-gray-200 px-3 py-1 rounded" onClick={onCancel}>ط¥ظ„ط؛ط§ط،</button>
        <button className="bg-green-600 text-white px-3 py-1 rounded" onClick={submit}>ط­ظپط¸</button>
      </div>
    </div>
  );
}

function MatchForm({ initial = null, onSave, onCancel }) {
  const [title, setTitle] = useState(initial?.title || "");
  const [date, setDate] = useState(initial?.date || "");
  const [location, setLocation] = useState(initial?.location || "");

  const submit = () => {
    if (!title || !date) return alert('ط§ط¯ط®ظ„ ط¹ظ†ظˆط§ظ† ظˆطھط§ط±ظٹط® ط§ظ„ظ…ط¨ط§ط±ط§ط©');
    onSave({ id: initial?.id || Date.now(), title, date, location, status: initial?.status || (new Date(date) > new Date() ? 'ظ‚ط§ط¯ظ…ط©' : 'ظ…ظ†طھظ‡ظٹط©') });
  };

  return (
    <div className="space-y-3">
      <label className="block">ط¹ظ†ظˆط§ظ† ط§ظ„ظ…ط¨ط§ط±ط§ط©<input className="w-full border p-2 rounded mt-1" value={title} onChange={e=>setTitle(e.target.value)} /></label>
      <div className="grid grid-cols-2 gap-2">
        <label>ط§ظ„طھط§ط±ظٹط®<input className="w-full border p-2 rounded mt-1" type="date" value={date} onChange={e=>setDate(e.target.value)} /></label>
        <label>ط§ظ„ظ…ظƒط§ظ†<input className="w-full border p-2 rounded mt-1" value={location} onChange={e=>setLocation(e.target.value)} /></label>
      </div>
      <div className="flex gap-2 justify-end">
        <button className="bg-gray-200 px-3 py-1 rounded" onClick={onCancel}>ط¥ظ„ط؛ط§ط،</button>
        <button className="bg-green-600 text-white px-3 py-1 rounded" onClick={submit}>ط­ظپط¸</button>
      </div>
    </div>
  );
}

function VideoForm({ initial = null, onSave, onCancel }) {
  const [url, setUrl] = useState(initial?.url || "");
  const [fileData, setFileData] = useState(initial?.fileData || "");
  const [mode, setMode] = useState(initial?.mode || "link");

  const handleFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      setFileData(reader.result);
      setMode("file");
      setUrl("");
    };
    reader.readAsDataURL(f);
  };

  const submit = () => {
    if (mode === "link" && !url) return alert('ط§ط¯ط®ظ„ ط±ط§ط¨ط· ط§ظ„ظپظٹط¯ظٹظˆ');
    if (mode === "file" && !fileData) return alert('ط§ط±ظپط¹ ظ…ظ„ظپ ط§ظ„ظپظٹط¯ظٹظˆ');
    onSave({ id: initial?.id || Date.now(), url, fileData, mode });
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        <label className="flex items-center gap-2">
          <input type="radio" checked={mode === "link"} onChange={() => setMode("link")} />
          ط¨ط±ط§ط¨ط·
        </label>
        <label className="flex items-center gap-2">
          <input type="radio" checked={mode === "file"} onChange={() => setMode("file")} />
          ظ…ظ† ط§ظ„ط¬ظ‡ط§ط²
        </label>
      </div>

      {mode === "link" && (
        <label className="block">ط±ط§ط¨ط· ط§ظ„ظپظٹط¯ظٹظˆ<input className="w-full border p-2 rounded mt-1" value={url} onChange={e=>setUrl(e.target.value)} /></label>
      )}

      {mode === "file" && (
        <div className="flex flex-col gap-2">
          <input type="file" accept="video/*" onChange={handleFile} />
          {fileData && <video src={fileData} controls className="w-full rounded" />}
        </div>
      )}

      <div className="flex gap-2 justify-end">
        <button className="bg-gray-200 px-3 py-1 rounded" onClick={onCancel}>ط¥ظ„ط؛ط§ط،</button>
        <button className="bg-green-600 text-white px-3 py-1 rounded" onClick={submit}>ط­ظپط¸</button>
      </div>
    </div>
  );
}

// ---------------------- main app ----------------------
function SportsManagerApp() {
  const [coaches, setCoaches] = useLocalStorage('sm_coaches', seedCoaches);
  const [courses, setCourses] = useLocalStorage('sm_courses', seedCourses);
  const [players, setPlayers] = useLocalStorage('sm_players', seedPlayers);
  const [matches, setMatches] = useLocalStorage('sm_matches', seedMatches);
  const [videos, setVideos] = useLocalStorage('sm_videos', []);

  const [tab, setTab] = useState('overview');
  const [query, setQuery] = useState('');
  const [sportFilter, setSportFilter] = useState('');

  // modal states
  const [coachModalOpen, setCoachModalOpen] = useState(false);
  const [coachEdit, setCoachEdit] = useState(null);

  const [playerModalOpen, setPlayerModalOpen] = useState(false);
  const [playerEdit, setPlayerEdit] = useState(null);

  const [matchModalOpen, setMatchModalOpen] = useState(false);
  const [matchEdit, setMatchEdit] = useState(null);

  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [videoEdit, setVideoEdit] = useState(null);

  const upcoming = useMemo(() => matches.filter(m => m.status === 'ظ‚ط§ط¯ظ…ط©' || new Date(m.date) > new Date()), [matches]);

  // CRUD operations
  const addOrUpdateCoach = (coach) => setCoaches(prev => {
    const exists = prev.find(x=>x.id===coach.id);
    if (exists) return prev.map(x=>x.id===coach.id?coach:x);
    return [coach, ...prev];
  });
  const deleteCoach = (id) => { if (!confirm('ظ…طھط£ظƒط¯ ظ…ظ† ط­ط°ظپ ط§ظ„ظ…ط¯ط±ط¨طں')) return; setCoaches(prev=>prev.filter(x=>x.id!==id)); };

  const addOrUpdatePlayer = (player) => setPlayers(prev => {
    const exists = prev.find(x=>x.id===player.id);
    if (exists) return prev.map(x=>x.id===player.id?player:x);
    return [player, ...prev];
  });
  const deletePlayer = (id) => { if (!confirm('ظ…طھط£ظƒط¯ ظ…ظ† ط­ط°ظپ ط§ظ„ظ„ط§ط¹ط¨طں')) return; setPlayers(prev=>prev.filter(x=>x.id!==id)); };

  const addOrUpdateMatch = (m) => setMatches(prev => {
    const exists = prev.find(x=>x.id===m.id);
    if (exists) return prev.map(x=>x.id===m.id?m:x);
    return [m, ...prev];
  });
  const deleteMatch = (id) => { if (!confirm('ظ…طھط£ظƒط¯ ظ…ظ† ط­ط°ظپ ط§ظ„ظ…ط¨ط§ط±ط§ط©طں')) return; setMatches(prev=>prev.filter(x=>x.id!==id)); };

  const addOrUpdateVideo = (v) => setVideos(prev => {
    const exists = prev.find(x=>x.id===v.id);
    if (exists) return prev.map(x=>x.id===v.id?v:x);
    return [v, ...prev];
  });
  const deleteVideo = (id) => { if (!confirm('ظ…طھط£ظƒط¯ ظ…ظ† ط­ط°ظپ ط§ظ„ظپظٹط¯ظٹظˆطں')) return; setVideos(prev=>prev.filter(x=>x.id!==id)); };

  const filteredPlayers = useMemo(()=>{
    let list = [...players];
    if (query) list = list.filter(p => p.name.includes(query) || p.team.includes(query) || p.sport.includes(query));
    if (sportFilter) list = list.filter(p => p.sport === sportFilter);
    return list;
  }, [players, query, sportFilter]);

  const uniqueSports = useMemo(()=>{
    const s = new Set([
      ...coaches.map(c=>c.sport),
      ...courses.map(c=>c.sport),
      ...players.map(p=>p.sport)
    ].filter(Boolean));
    return Array.from(s);
  }, [coaches, courses, players]);

  const enrollmentData = useMemo(()=>courses.map(c=>({ name:c.title, enrolled:c.enrolled, seats:c.seats })), [courses]);

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-slate-50 to-white text-slate-900">
      <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">PA</div>
            <div>
              <div className="text-lg font-bold">Power Academy</div>
              <div className="text-xs text-gray-600">ط·ظ„ظ‘ط¹ ط§ظ„ط®ظˆظپ ط§ظ„ظ„ظٹ ط¬ظˆط§ظƒ</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* search visible only on players tab */}
            {tab === 'players' ? (
              <input placeholder="ط§ط¨ط­ط« ط¹ظ† ظ„ط§ط¹ط¨/ظپط±ظٹظ‚/ط±ظٹط§ط¶ط©" value={query} onChange={e=>setQuery(e.target.value)} className="border rounded px-3 py-2" />
            ) : null}
            <button className="bg-gray-100 px-3 py-2 rounded">ط¨ط­ط«</button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4">
        <section className="grid md:grid-cols-2 gap-8 items-center border-b py-8">
          <div>
            <h2 className="text-3xl font-extrabold">ظ…ظ†طµط© ظ…طھظƒط§ظ…ظ„ط© ظ„ط¥ط¯ط§ط±ط© ط§ظ„ط£ظƒط§ط¯ظٹظ…ظٹط© ظˆط§ظ„ظپط±ظ‚ ظˆط§ظ„ظ„ط§ط¹ط¨ظٹظ† ظˆط§ظ„ط¯ظˆط±ط§طھ</h2>
            <p className="mt-3 text-gray-600">ط±ط§ظ‚ط¨ ط§ظ„ط¥ط­طµط§ط¦ظٹط§طھطŒ ظ†ط¸ظ… ط§ظ„ظƒظˆط±ط³ط§طھطŒ ط£ط¯ظگط± ط§ظ„ظ…ط¯ط±ط¨ظٹظ† ظˆط§ظ„ظ„ط§ط¹ط¨ظٹظ†طŒ ظˆطھط§ط¨ط¹ ط§ظ„ظ…ط¨ط§ط±ظٹط§طھ ظˆط§ظ„ط¨ط·ظˆظ„ط§طھ.</p>
            <div className="mt-4 flex gap-3">
              <button onClick={()=>setTab('overview')} className="bg-green-600 text-white px-4 py-2 rounded">ط¹ط±ط¶ ط§ظ„ظ„ظˆط­ط©</button>
              <a href="#contact" className="bg-white border px-4 py-2 rounded">طھظˆط§طµظ„ ظ…ط¹ظ†ط§</a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded shadow">
              <div className="text-sm text-gray-500">ط¹ط¯ط¯ ط§ظ„ظ„ط§ط¹ط¨ظٹظ†</div>
              <div className="text-2xl font-bold">{players.length}</div>
            </div>
            <div className="p-4 bg-white rounded shadow">
              <div className="text-sm text-gray-500">ط§ظ„ظƒظˆط±ط³ط§طھ</div>
              <div className="text-2xl font-bold">{courses.length}</div>
            </div>
            <div className="p-4 bg-white rounded shadow">
              <div className="text-sm text-gray-500">ط§ظ„ظ…ط¯ط±ط¨ظٹظ†</div>
              <div className="text-2xl font-bold">{coaches.length}</div>
            </div>
            <div className="p-4 bg-white rounded shadow">
              <div className="text-sm text-gray-500">ظ…ط¨ط§ط±ظٹط§طھ ظ‚ط§ط¯ظ…ط©</div>
              <div className="text-2xl font-bold">{upcoming.length}</div>
            </div>
          </div>
        </section>

        {/* Tabs navigation */}
        <nav className="flex gap-2 mt-6">
          {['overview','coaches','courses','players','matches','videos'].map(t=> (
            <button key={t} onClick={()=>setTab(t)} className={`px-3 py-2 rounded ${tab===t? 'bg-green-600 text-white' : 'bg-white border'}`}>{t==='overview'? 'ط§ظ„ط±ط¦ظٹط³ظٹط©' : t==='coaches'? 'ط§ظ„ظ…ط¯ط±ط¨ظˆظ†' : t==='courses'? 'ط§ظ„ظƒظˆط±ط³ط§طھ' : t==='players'? 'ط§ظ„ظ„ط§ط¹ط¨ظˆظ†' : t==='matches'? 'ط§ظ„ظ…ط¨ط§ط±ظٹط§طھ' : 'ط§ظ„ظپظٹط¯ظٹظˆظ‡ط§طھ'}</button>
          ))}
        </nav>

        <section className="mt-6">
          {tab==='overview' && (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded p-4 shadow">
                <h3 className="font-semibold mb-2">ط§ظ„ط¥ط­طµط§ط¦ظٹط§طھ (طھط¨ط³ظٹط·)</h3>
                <ul className="list-disc list-inside text-sm text-gray-700">
                  <li>ظƒظˆط±ط³ط§طھ: {courses.length}</li>
                  <li>ظ„ط§ط¹ط¨ظٹظ†: {players.length}</li>
                  <li>ظ…ط¯ط±ط¨ظٹظ†: {coaches.length}</li>
                  <li>ظ…ط¨ط§ط±ظٹط§طھ ظ‚ط§ط¯ظ…ط©: {upcoming.length}</li>
                </ul>
              </div>

              <div className="bg-white rounded p-4 shadow">
                <h3 className="font-semibold mb-2">ط§ظ„ظ…ط¨ط§ط±ظٹط§طھ ط§ظ„ظ‚ط§ط¯ظ…ط©</h3>
                <div className="space-y-3">
                  {upcoming.map(m => (
                    <div key={m.id} className="border rounded p-3 flex justify-between items-center">
                      <div>
                        <div className="font-medium">{m.title}</div>
                        <div className="text-sm text-gray-500">{new Date(m.date).toLocaleDateString('ar-EG')} â€” {m.location}</div>
                      </div>
                      <div className="text-sm">{m.status}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tab==='coaches' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">ظ‚ط§ط¦ظ…ط© ط§ظ„ظ…ط¯ط±ط¨ظٹظ†</h3>
                <div>
                  <button className="bg-green-600 text-white px-3 py-2 rounded" onClick={()=>{ setCoachEdit(null); setCoachModalOpen(true); }}>ط¥ط¶ط§ظپط© ظ…ط¯ط±ط¨</button>
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                {coaches.map(c=> (
                  <div key={c.id} className="bg-white rounded p-4 shadow">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gray-100 overflow-hidden">
                        {c.image ? <img src={c.image} alt={c.name} className="w-full h-full object-cover"/> : <div className="flex items-center justify-center h-full text-gray-400">ًں‘¤</div>}
                      </div>
                      <div>
                        <div className="font-medium">{c.name}</div>
                        <div className="text-sm text-gray-500">{c.sport}</div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{c.bio}</p>
                    <div className="mt-3 flex gap-2">
                      <button className="px-2 py-1 bg-gray-100 rounded" onClick={()=>{ setCoachEdit(c); setCoachModalOpen(true); }}>طھط¹ط¯ظٹظ„</button>
                      <button className="px-2 py-1 bg-red-500 text-white rounded" onClick={()=>deleteCoach(c.id)}>ط­ط°ظپ</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab==='courses' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">ط§ظ„ظƒظˆط±ط³ط§طھ</h3>
                <button className="bg-green-600 text-white px-3 py-2 rounded" onClick={()=>{ const title = prompt('ط§ط³ظ… ط§ظ„ظƒظˆط±ط³'); if(title) setCourses(prev=>[{ id: Date.now(), title, sport:'ط¹ط§ظ…', level:'ظ…ط¨طھط¯ط¦', price:0, durationWeeks:4, seats:20, enrolled:0 }, ...prev]); }}>ط¥ط¶ط§ظپط© ظƒظˆط±ط³</button>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                {courses.map(c=> (
                  <div key={c.id} className="bg-white rounded p-4 shadow">
                    <div className="font-medium">{c.title}</div>
                    <div className="text-sm text-gray-500">{c.sport} â€¢ {c.level}</div>
                    <div className="mt-3 flex gap-2">
                      <button className="px-2 py-1 bg-gray-100 rounded" onClick={()=>{ const t = prompt('طھط¹ط¯ظٹظ„ ط¹ظ†ظˆط§ظ† ط§ظ„ظƒظˆط±ط³', c.title); if(t) setCourses(prev=>prev.map(x=>x.id===c.id?{...x,title:t}:x)); }}>طھط¹ط¯ظٹظ„</button>
                      <button className="px-2 py-1 bg-red-500 text-white rounded" onClick={()=>setCourses(prev=>prev.filter(x=>x.id!==c.id))}>ط­ط°ظپ</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab==='players' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">ظ‚ط§ط¹ط¯ط© ط¨ظٹط§ظ†ط§طھ ط§ظ„ظ„ط§ط¹ط¨ظٹظ†</h3>
                <div className="flex gap-2">
                  <select className="border p-2 rounded" value={sportFilter} onChange={e=>setSportFilter(e.target.value)}>
                    <option value="">ظƒظ„ ط§ظ„ط±ظٹط§ط¶ط§طھ</option>
                    {uniqueSports.map(s=> <option key={s} value={s}>{s}</option>)}
                  </select>
                  <button className="bg-green-600 text-white px-3 py-2 rounded" onClick={()=>{ setPlayerEdit(null); setPlayerModalOpen(true); }}>ط¥ط¶ط§ظپط© ظ„ط§ط¹ط¨</button>
                </div>
              </div>

              <div className="bg-white rounded shadow">
                <table className="w-full table-fixed text-sm">
                  <thead className="text-left bg-gray-50">
                    <tr>
                      <th className="p-2 w-20">ط§ظ„طµظˆط±ط©</th>
                      <th className="p-2">ط§ظ„ط§ط³ظ…</th>
                      <th className="p-2">ط§ظ„ط¹ظ…ط±</th>
                      <th className="p-2">ط§ظ„ط±ظٹط§ط¶ط©</th>
                      <th className="p-2">ط§ظ„ظپط±ظٹظ‚</th>
                      <th className="p-2">ظˆظ„ظٹ ط§ظ„ط£ظ…ط±</th>
                      <th className="p-2">ط§ظ„ظ‡ط§طھظپ</th>
                      <th className="p-2">ط¥ط¬ط±ط§ط،ط§طھ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPlayers.map(p=> (
                      <tr key={p.id} className="border-t">
                        <td className="p-2">{p.image? <img src={p.image} alt={p.name} className="w-12 h-12 object-cover rounded"/> : '-'}</td>
                        <td className="p-2 font-medium">{p.name}</td>
                        <td className="p-2">{p.age}</td>
                        <td className="p-2">{p.sport}</td>
                        <td className="p-2">{p.team}</td>
                        <td className="p-2">{p.guardian}</td>
                        <td className="p-2">{p.phone}</td>
                        <td className="p-2">
                          <div className="flex gap-2">
                            <button className="px-2 py-1 bg-gray-100 rounded" onClick={()=>{ setPlayerEdit(p); setPlayerModalOpen(true); }}>طھط¹ط¯ظٹظ„</button>
                            <button className="px-2 py-1 bg-red-500 text-white rounded" onClick={()=>deletePlayer(p.id)}>ط­ط°ظپ</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {tab==='matches' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">ط§ظ„ظ…ط¨ط§ط±ظٹط§طھ</h3>
                <button className="bg-green-600 text-white px-3 py-2 rounded" onClick={()=>{ setMatchEdit(null); setMatchModalOpen(true); }}>ط¥ط¶ط§ظپط© ظ…ط¨ط§ط±ط§ط©</button>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {matches.map(m=> (
                  <div key={m.id} className="bg-white rounded p-4 shadow">
                    <div className="font-medium">{m.title}</div>
                    <div className="text-sm text-gray-500">{new Date(m.date).toLocaleDateString('ar-EG')} â€” {m.location}</div>
                    <div className="mt-3 flex gap-2">
                      <button className="px-2 py-1 bg-gray-100 rounded" onClick={()=>{ setMatchEdit(m); setMatchModalOpen(true); }}>طھط¹ط¯ظٹظ„</button>
                      <button className="px-2 py-1 bg-red-500 text-white rounded" onClick={()=>deleteMatch(m.id)}>ط­ط°ظپ</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab==='videos' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">ط§ظ„ظپظٹط¯ظٹظˆظ‡ط§طھ</h3>
                <button className="bg-green-600 text-white px-3 py-2 rounded" onClick={()=>{ setVideoEdit(null); setVideoModalOpen(true); }}>ط¥ط¶ط§ظپط© ظپظٹط¯ظٹظˆ</button>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  {videos.map(v=> (
                    <div key={v.id} className="flex justify-between items-center border rounded p-2">
                      {v.mode === 'link' ? (
                        <a href={v.url} target="_blank" rel="noreferrer" className="text-blue-600">{v.url}</a>
                      ) : (
                        <span className="text-gray-600">ًںژ¬ ظپظٹط¯ظٹظˆ ظ…ط±ظپظˆط¹ ظ…ظ† ط§ظ„ط¬ظ‡ط§ط²</span>
                      )}
                      <div className="flex gap-2">
                        <button className="px-2 py-1 bg-red-500 text-white rounded" onClick={()=>deleteVideo(v.id)}>ط­ط°ظپ</button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  {videos.slice(0,2).map(v=> (
                    <div key={v.id} className="aspect-video rounded overflow-hidden border">
                      {v.mode === 'link' ? (
                        v.url.includes('youtube') ? (
                          <iframe className="w-full h-full" src={v.url.replace('watch?v=','embed/')} title="video" allowFullScreen />
                        ) : (
                          <video src={v.url} controls className="w-full h-full" />
                        )
                      ) : (
                        <video src={v.fileData} controls className="w-full h-full" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>

        <section id="contact" className="mt-10">
          <div className="bg-white rounded p-6 shadow">
            <h3 className="text-lg font-semibold">طھظˆط§طµظ„ ظ…ط¹ظ†ط§</h3>
            <p className="text-sm text-gray-600 mt-2">ط±ط§ط³ظ„ظ†ط§ ظ„ط¨ط¯ط، طھط´ط؛ظٹظ„ ظ…ظˆظ‚ط¹ظƒ ط¨ظ†ط³ط®ط© ظ…ط®طµطµط©</p>
          </div>
        </section>
      </main>

      {/* modals */}
      <Modal isOpen={coachModalOpen} title={coachEdit? 'طھط¹ط¯ظٹظ„ ظ…ط¯ط±ط¨':'ط¥ط¶ط§ظپط© ظ…ط¯ط±ط¨'} onClose={()=>{ setCoachModalOpen(false); setCoachEdit(null); }}>
        <CoachForm initial={coachEdit} onSave={(c)=>{ addOrUpdateCoach(c); setCoachModalOpen(false); setCoachEdit(null); }} onCancel={()=>{ setCoachModalOpen(false); setCoachEdit(null); }} />
      </Modal>

      <Modal isOpen={playerModalOpen} title={playerEdit? 'طھط¹ط¯ظٹظ„ ظ„ط§ط¹ط¨':'ط¥ط¶ط§ظپط© ظ„ط§ط¹ط¨'} onClose={()=>{ setPlayerModalOpen(false); setPlayerEdit(null); }}>
        <PlayerForm initial={playerEdit} onSave={(p)=>{ addOrUpdatePlayer(p); setPlayerModalOpen(false); setPlayerEdit(null); }} onCancel={()=>{ setPlayerModalOpen(false); setPlayerEdit(null); }} />
      </Modal>

      <Modal isOpen={matchModalOpen} title={matchEdit? 'طھط¹ط¯ظٹظ„ ظ…ط¨ط§ط±ط§ط©':'ط¥ط¶ط§ظپط© ظ…ط¨ط§ط±ط§ط©'} onClose={()=>{ setMatchModalOpen(false); setMatchEdit(null); }}>
        <MatchForm initial={matchEdit} onSave={(m)=>{ addOrUpdateMatch(m); setMatchModalOpen(false); setMatchEdit(null); }} onCancel={()=>{ setMatchModalOpen(false); setMatchEdit(null); }} />
      </Modal>

      <Modal isOpen={videoModalOpen} title={videoEdit? 'طھط¹ط¯ظٹظ„ ظپظٹط¯ظٹظˆ':'ط¥ط¶ط§ظپط© ظپظٹط¯ظٹظˆ'} onClose={()=>{ setVideoModalOpen(false); setVideoEdit(null); }}>
        <VideoForm initial={videoEdit} onSave={(v)=>{ addOrUpdateVideo(v); setVideoModalOpen(false); setVideoEdit(null); }} onCancel={()=>{ setVideoModalOpen(false); setVideoEdit(null); }} />
      </Modal>

    </div>
  );
}

export default function CustomizedSportsApp() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 text-slate-900" dir="rtl">
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">PA</div>
            <div>
              <h1 className="text-lg font-bold leading-none text-blue-700">ظ…ط­ظ…ط¯ ط¹ظ…ط§ط¯ ط¬ط§ط¨ط±</h1>
              <p className="text-xs text-green-600">ط·ظ„ظ‘ط¹ ط§ظ„ط®ظˆظپ ط§ظ„ظ„ظٹ ط¬ظˆط§ظƒ</p>
            </div>
          </div>
        </div>
      </header>

      <main>
        <SportsManagerApp />
      </main>

      <footer className="border-t bg-white mt-8">
        <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-muted-foreground flex flex-wrap gap-2 items-center justify-between">
          <span>آ© {new Date().getFullYear()} ظ…ظˆظ‚ط¹ ط®ط§طµ ط¨ظ€ ظ…ط­ظ…ط¯ ط¹ظ…ط§ط¯ ط¬ط§ط¨ط± â€” ظƒظ„ ط§ظ„ط­ظ‚ظˆظ‚ ظ…ط­ظپظˆط¸ط©</span>
          <span>طھط·ظˆظٹط± ظˆطھطµظ…ظٹظ… ط¨ط§ظ„ط£ظ„ظˆط§ظ† ط§ظ„ط±ط³ظ…ظٹط© (ط§ظ„ط£ط®ط¶ط± ظˆط§ظ„ط£ط²ط±ظ‚)</span>
        </div>
      </footer>
    </div>
  );
}