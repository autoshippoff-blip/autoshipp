const fs = require('fs');
const path = require('path');
function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('page.js')) results.push(file);
    }
  });
  return results;
}
walk('src/app').forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  content = content.replace(/import DashboardHeader from '@\/components\/dashboard\/DashboardHeader';/g, "import { PageHeader as DashboardHeader } from '@/components/PageHeader';");
  fs.writeFileSync(f, content);
});
