interface BugFix {
  
  thanks?: string;
}

interface Build {
  build: number;
  date: string;
  description?: string[];
  types?: string[];
  fixes?: BugFix[];
}

const builds: Build[] = []