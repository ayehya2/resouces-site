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
    ExternalLink
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
    'external-link': ExternalLink
};

const emojiMap: Record<string, string> = {
    'brain': '🧠',
    'shield': '🛡️',
    'terminal': '💻',
    'search': '🔍',
    'eye-off': '👁️‍🗨️',
    'network': '🌐',
    'code': '👨‍💻',
    'database': '🗄️',
    'monitor': '🖥️',
    'git-branch': '🌿',
    'link': '🔗',
    'calculator': '🔢',
    'award': '🏆',
    'github': '🐙',
    'package': '📦',
    'globe': '🌍',
    'youtube': '📺',
    'hard-drive': '💾',
    'activity': '📈',
    'lock': '🔒',
    'shield-check': '✅',
    'star': '⭐',
    'website': '🌐',
    'documentation': '📚',
    'download': '📥'
};

interface IconProps {
    name: string;
    className?: string;
    useEmoji?: boolean;
}

export function Icon({ name, className, useEmoji = false }: IconProps) {
    const lowerName = name.toLowerCase();

    if (useEmoji) {
        return <span className={className}>{emojiMap[lowerName] || '📄'}</span>;
    }

    const LucideIcon = iconMap[lowerName];
    if (LucideIcon) {
        return <LucideIcon className={className} />;
    }

    // Fallback to emoji if no lucide icon found
    return <span className={className}>{emojiMap[lowerName] || '📄'}</span>;
}
