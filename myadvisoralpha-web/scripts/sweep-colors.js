const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'src/app/about/page.tsx',
  'src/app/contact/page.tsx',
  'src/components/calculators/SipCalculator.tsx',
  'src/components/layout/MobileNav.tsx',
  'src/components/layout/QrDownloadCard.tsx',
  'src/components/sections/ComparisonGrid.tsx',
  'src/components/sections/HeroSection.tsx',
  'src/components/sections/StackedShowcase.tsx',
  'src/components/sections/Testimonials.tsx',
];

filesToUpdate.forEach(relPath => {
  const fullPath = path.join(__dirname, '..', relPath);
  if (!fs.existsSync(fullPath)) return;
  let content = fs.readFileSync(fullPath, 'utf8');

  // Replace background and button colors
  content = content.replace(/bg-\[#1C6FE6\]/g, 'bg-[#F5BA31] text-[#081026]');
  content = content.replace(/hover:bg-\[#1a6de0\]/g, 'hover:bg-[#e5ab28]');
  content = content.replace(/hover:bg-\[#1C6FE6\]/g, 'hover:bg-[#e5ab28]');
  content = content.replace(/bg-\[#237FFB\]/g, 'bg-[#F5BA31] text-[#081026]');
  content = content.replace(/text-\[#237FFB\]/g, 'text-[#F5BA31]');
  content = content.replace(/border-\[#237FFB\]/g, 'border-[#F5BA31]');
  content = content.replace(/focus:border-\[#237FFB\]/g, 'focus:border-[#F5BA31]');
  content = content.replace(/focus-within:border-\[#237FFB\]/g, 'focus-within:border-[#F5BA31]');
  content = content.replace(/focus-within:ring-\[#237FFB\]/g, 'focus-within:ring-[#F5BA31]');
  content = content.replace(/hover:border-\[#237FFB\]/g, 'hover:border-[#F5BA31]');
  content = content.replace(/group-hover:text-\[#237FFB\]/g, 'group-hover:text-[#F5BA31]');
  content = content.replace(/group-hover:bg-\[#237FFB\]/g, 'group-hover:bg-[#F5BA31]');
  content = content.replace(/shadow-\[#237FFB\]\/30/g, 'shadow-black/40');
  content = content.replace(/rgba\(35,127,251,/g, 'rgba(245,186,49,');
  content = content.replace(/#237FFB/g, '#F5BA31');
  content = content.replace(/#1C6FE6/g, '#F5BA31');
  content = content.replace(/#0066f5/g, '#F5BA31');

  // Replace dark black backgrounds with Midnight Navy tokens
  content = content.replace(/#0B0E14/g, '#0B1528');
  content = content.replace(/#111622/g, '#0D1A33');
  content = content.replace(/#1A2230/g, '#0D1A33');

  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`Swept colors in: ${relPath}`);
});
