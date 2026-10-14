import {
  Activity,
  Archive,
  Boxes,
  Container,
  Cpu,
  Database,
  GitBranch,
  Globe,
  HardDrive,
  Cloud,
  Network,
  Server,
  ShieldCheck,
  Waypoints,
  Wrench,
  type LucideIcon,
} from 'lucide-react';

// Data behind the platform page: the page only paints it. Proper names (products, tools,
// vendors) are literals; everything translatable is a locale key, and every figure arrives
// from `platformVars()` in config/facts.ts — nothing numeric is typed here or in the copy.
// Architecture, not inventory: no IPs, hostnames, machine ids or account names belong in
// this file, in the locale strings or on the page.

export interface DiagramNode {
  id: string;
  icon: LucideIcon;
  /** Proper name shown verbatim… */
  name?: string;
  /** …or a locale key for a translated one. */
  nameKey?: string;
  sub?: string;
  subKey?: string;
  /** Operations nodes only: how the node relates to the cluster, in words. */
  relationKey?: string;
}

export const edgeNodes: { internet: DiagramNode; cloudflare: DiagramNode } = {
  internet: { id: 'internet', icon: Globe, name: 'Internet' },
  cloudflare: {
    id: 'cloudflare',
    icon: Cloud,
    name: 'Cloudflare',
    subKey: 'platform_node_cloudflare_sub',
  },
};

export const clusterTiers: {
  firewall: { captionKey: string; nodes: DiagramNode[] };
  proxy: { node: DiagramNode };
  apps: { captionKey: string; nodes: DiagramNode[] };
  data: { captionKey: string; nodes: DiagramNode[] };
} = {
  firewall: {
    captionKey: 'platform_tier_firewall',
    nodes: [
      {
        id: 'fw-primary',
        icon: ShieldCheck,
        nameKey: 'platform_node_fw_primary',
        sub: 'OPNsense · Suricata IDS',
      },
      {
        id: 'fw-standby',
        icon: ShieldCheck,
        nameKey: 'platform_node_fw_standby',
        sub: 'OPNsense · Suricata IDS',
      },
    ],
  },
  proxy: {
    node: {
      id: 'proxy',
      icon: Waypoints,
      name: 'Nginx Proxy Manager',
      subKey: 'platform_node_proxy_sub',
    },
  },
  apps: {
    captionKey: 'platform_tier_apps',
    nodes: [
      {
        id: 'app-server',
        icon: Server,
        nameKey: 'platform_node_appserver',
        subKey: 'platform_node_appserver_sub',
      },
      {
        id: 'lxc-per-app',
        icon: Container,
        nameKey: 'platform_node_lxc',
        subKey: 'platform_node_lxc_sub',
      },
      { id: 'dcompany', icon: Boxes, name: 'dcompany', subKey: 'platform_node_dcompany_sub' },
    ],
  },
  data: {
    captionKey: 'platform_tier_data',
    nodes: [
      { id: 'mongodb', icon: Database, name: 'MongoDB', subKey: 'platform_node_mongo_sub' },
      { id: 'dstash', icon: HardDrive, name: 'dstash', subKey: 'platform_node_dstash_sub' },
      { id: 'gpu', icon: Cpu, nameKey: 'platform_node_gpu', subKey: 'platform_node_gpu_sub' },
    ],
  },
};

export const clusterFrameKey = 'platform_frame_cluster';
export const opsCaptionKey = 'platform_tier_ops';

export const opsNodes: DiagramNode[] = [
  {
    id: 'ci',
    icon: GitBranch,
    name: 'CI/CD',
    subKey: 'platform_node_ci_sub',
    relationKey: 'platform_node_ci_rel',
  },
  {
    id: 'observability',
    icon: Activity,
    nameKey: 'platform_node_obs',
    sub: 'Prometheus · Loki · Grafana',
    relationKey: 'platform_node_obs_rel',
  },
  {
    id: 'backups',
    icon: Archive,
    nameKey: 'platform_node_backup',
    subKey: 'platform_node_backup_sub',
    relationKey: 'platform_node_backup_rel',
  },
];

/** Every diagram node, in reading order — what the tests and the page's text checks walk. */
export const allDiagramNodes: DiagramNode[] = [
  edgeNodes.internet,
  edgeNodes.cloudflare,
  ...clusterTiers.firewall.nodes,
  clusterTiers.proxy.node,
  ...clusterTiers.apps.nodes,
  ...clusterTiers.data.nodes,
  ...opsNodes,
];

/** The figures strip: `varKey` indexes `platformVars(lang)`. */
export const platformFigures: { varKey: string; labelKey: string }[] = [
  { varKey: 'nodes', labelKey: 'platform_fig_nodes' },
  { varKey: 'guests', labelKey: 'platform_fig_guests' },
  { varKey: 'guestsWithoutBackup', labelKey: 'platform_fig_unbacked' },
  { varKey: 'alertRules', labelKey: 'platform_fig_alerts' },
  { varKey: 'probes', labelKey: 'platform_fig_probes' },
  { varKey: 'workflows', labelKey: 'platform_fig_workflows' },
];

export interface PlatformCard {
  id: string;
  icon: LucideIcon;
  titleKey: string;
  bodyKey: string;
  metaKey?: string;
  /** Project slugs whose case study proves the card; rendered as links. */
  usedBy?: string[];
  /** Internal tools: described, never linked. */
  tools?: { name: string; descKey: string }[];
}

export const platformCards: PlatformCard[] = [
  {
    id: 'cluster',
    icon: Network,
    titleKey: 'platform_card_cluster_title',
    bodyKey: 'platform_card_cluster_body',
    metaKey: 'platform_card_cluster_meta',
  },
  {
    id: 'firewall',
    icon: ShieldCheck,
    titleKey: 'platform_card_firewall_title',
    bodyKey: 'platform_card_firewall_body',
    metaKey: 'platform_card_firewall_meta',
  },
  {
    id: 'ci',
    icon: GitBranch,
    titleKey: 'platform_card_ci_title',
    bodyKey: 'platform_card_ci_body',
    metaKey: 'platform_card_ci_meta',
  },
  {
    id: 'observability',
    icon: Activity,
    titleKey: 'platform_card_observability_title',
    bodyKey: 'platform_card_observability_body',
    metaKey: 'platform_card_observability_meta',
  },
  {
    id: 'inference',
    icon: Cpu,
    titleKey: 'platform_card_inference_title',
    bodyKey: 'platform_card_inference_body',
    metaKey: 'platform_card_inference_meta',
    usedBy: ['dalist', 'dinventory'],
  },
  {
    id: 'tools',
    icon: Wrench,
    titleKey: 'platform_card_tools_title',
    bodyKey: 'platform_card_tools_body',
    tools: [
      { name: 'voxdrop', descKey: 'platform_tool_voxdrop' },
      { name: 'meetscribe', descKey: 'platform_tool_meetscribe' },
      { name: 'ops-dashboard', descKey: 'platform_tool_ops' },
      { name: 'error-watcher', descKey: 'platform_tool_errorwatcher' },
      { name: 'dcompany-provisioner', descKey: 'platform_tool_provisioner' },
    ],
  },
];
