const fs = require('fs');
const path = require('path');

const files = [
  'src/app/about/page.tsx',
  'src/components/calculators/SipCalculator.tsx',
  'src/components/sections/ComparisonGrid.tsx',
  'src/components/sections/Testimonials.tsx',
];

files.forEach(f => {
  const p = path.join(__dirname, '..', f);
  if (!fs.existsSync(p)) return;
  let s = fs.readFileSync(p, 'utf8');

  // Fix about
  s = s.replace('bg-[#F5BA31] text-[#081026] hover:bg-[#e5ab28] text-white', 'bg-[#F5BA31] text-[#081026] hover:bg-[#e5ab28]');
  
  // Fix ComparisonGrid
  s = s.replace("bg-[#F5BA31] text-[#081026] text-white shadow-md", "bg-[#F5BA31] text-[#081026] font-bold shadow-md");
  s = s.replace("bg-[#F5BA31] text-[#081026] text-white text-[10px]", "bg-[#F5BA31] text-[#081026] text-[10px]");
  s = s.replace("bg-[#F5BA31] text-[#081026] hover:bg-[#F5BA31] text-[#081026] active:scale-95 text-white", "bg-[#F5BA31] text-[#081026] hover:bg-[#e5ab28] active:scale-95");
  s = s.replace("bg-[#F5BA31] text-[#081026] active:scale-95 text-white", "bg-[#F5BA31] text-[#081026] active:scale-95");

  // Fix Testimonials
  s = s.replace("bg-[#F5BA31] text-[#081026] text-white shadow-md", "bg-[#F5BA31] text-[#081026] font-bold shadow-md");
  s = s.replace("bg-[#F5BA31] text-[#081026] hover:bg-[#F5BA31] text-[#081026] active:scale-95 text-white", "bg-[#F5BA31] text-[#081026] hover:bg-[#e5ab28] active:scale-95");

  // Fix SipCalculator line 524
  s = s.replace("bg-[#F5BA31] text-[#081026]/15 hover:bg-[#F5BA31] text-[#081026]/25", "bg-[#F5BA31]/15 hover:bg-[#F5BA31]/25");

  fs.writeFileSync(p, s, 'utf8');
  console.log('Cleaned:', f);
});
