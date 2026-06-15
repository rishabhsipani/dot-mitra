import {
  Shield,
  Users,
  Lock,
  FileSearch,
  Blocks,
  Activity,
  Key,
  Globe,
  Server,
  Zap,
  BarChart3,
  Plug
} from 'lucide-react';

import scatteredDocs from '../assets/scattered documents.png';
import manualProcesses from '../assets/manual processes.png';
import repetitiveQueries from '../assets/Repetitive queries.png';
import limitedAccessibility from '../assets/limited accessibility.png';

import scalableSaas from '../assets/scalable saas platform.png';
import smartChat from '../assets/smart chat interface.png';
import contentModeration from '../assets/content moderation (1).png';
import secureMultiTenant from '../assets/secure multi tenant support.png';
import voiceReady from '../assets/voice ready system.png';

export const problemCards = [
  {
    image: scatteredDocs,
    title: 'Scattered Documents',
    description: 'Policies, regulations, and manuals exist across multiple disconnected systems.',
  },
  {
    image: manualProcesses,
    title: 'Manual Processes',
    description: 'Teams spend valuable time searching through PDFs and circulars.',
  },
  {
    image: repetitiveQueries,
    title: 'Repetitive Queries',
    description: 'Departments repeatedly answer similar public and internal questions.',
  },
  {
    image: limitedAccessibility,
    title: 'Limited Accessibility',
    description: 'Critical information is not always easy to access or understand.',
  },
];

export const solutionFeatures = [
  {
    icon: FileSearch,
    title: 'AI Knowledge Search',
    description: 'Instant answers from thousands of documents using advanced natural language processing.',
  },
  {
    icon: Shield,
    title: 'Document Intelligence',
    description: 'Automatically parse, index, and understand complex policy documents and SOPs.',
  },
  {
    icon: Globe,
    title: 'Multi-Language Support',
    description: 'Serve citizens in Hindi, English, and 10+ regional languages.',
  },
  {
    icon: Lock,
    title: 'Secure Infrastructure',
    description: 'Government-grade encryption with on-premise and sovereign cloud deployment.',
  },
  {
    icon: Plug,
    title: 'Easy Portal Integration',
    description: 'Embed in any existing portal or website with a single script tag.',
  },
  {
    icon: Zap,
    title: 'AI Chat Interface',
    description: 'Conversational AI that understands context, follows up, and cites sources.',
  },
];

export const enterpriseFeatures = [
  {
    image: scalableSaas,
    title: 'Scalable SaaS Platform',
    description: 'Built for multi-department and large scale deployments.',
  },
  {
    image: smartChat,
    title: 'Smart Chat Interface',
    description: 'Simple conversational UI for citizens, employees, and enterprises.',
  },
  {
    image: contentModeration,
    title: 'Content Moderation',
    description: 'Built-in safeguards for safer and policy aligned responses.',
  },
  {
    image: secureMultiTenant,
    title: 'Secure Multi-Tenant Support',
    description: 'Enable multiple departments and organisations to operate securely on shared infrastructure.',
  },
  {
    image: voiceReady,
    title: 'Voice Ready System',
    description: 'Built for multi-department and large scale deployments.',
  },
];
