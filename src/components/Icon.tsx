import {
    Brain,
    Shield,
    Terminal,
    Search,
    EyeOff,
    Network,
    Code,
    Database,
    Monitor,
    GitBranch,
    Link as LinkIcon,
    Calculator,
    Award,
    Github,
    Package,
    Globe,
    Youtube,
    HardDrive,
    Activity,
    Lock,
    ShieldCheck,
    Star,
    FileText,
    Download,
    ExternalLink,
    Cloud,
    Folder,
    BookOpen
} from 'lucide-react';

const iconMap: Record<string, any> = {
    'brain': Brain,
    'shield': Shield,
    'terminal': Terminal,
    'search': Search,
    'eye-off': EyeOff,
    'network': Network,
    'code': Code,
    'database': Database,
    'monitor': Monitor,
    'git-branch': GitBranch,
    'link': LinkIcon,
    'calculator': Calculator,
    'award': Award,
    'github': Github,
    'package': Package,
    'globe': Globe,
    'youtube': Youtube,
    'hard-drive': HardDrive,
    'activity': Activity,
    'lock': Lock,
    'shield-check': ShieldCheck,
    'star': Star,
    'file-text': FileText,
    'download': Download,
    'external-link': ExternalLink,
    'cloud': Cloud,
    'folder': Folder,
    'website': Globe,
    'documentation': BookOpen
};

interface IconProps {
    name: string;
    className?: string;
}

export function Icon({ name, className }: IconProps) {
    const lowerName = name.toLowerCase();
    const LucideIcon = iconMap[lowerName];

    if (LucideIcon) {
        return <LucideIcon className={className} />;
    }

    // Fallback to FileText icon if no mapping found
    return <FileText className={className} />;
}
