"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, MouseEvent, PointerEvent } from "react";

type Project = {
  id: string;
  title: string;
  label: string;
  year: string;
  theme: "AI产品" | "复杂系统" | "软硬件" | "交付闭环";
  summary: string;
  role: string;
  proof: string[];
  metrics: string[];
  visual: string;
};

type Burst = {
  id: number;
  x: number;
  y: number;
};

type Experience = {
  id: string;
  company: string;
  role: string;
  date: string;
  badge: string;
  points: string[];
  x: string;
  y: string;
};

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

const aboutBio =
  "我是在尝试在互联网上构建事物时开始涉足原型设计的。起初是从编写代码入手，但逐渐在理解人与弄清产品究竟如何产生实际影响的过程中，我变得愈发着迷。这不仅仅关乎事物的外观，更关乎它们如何影响人们的感受。如今，我从事横跨产品设计与人工智能领域的工作，致力于尽可能快地将创意转化为体验。工作之余，任何能带来活力与动感的事物都是我的兴趣所在。正是这种对世界进行观察的执着，最初促使我爱上了产品设计。";

const projects: Project[] = [
  {
    id: "ai-service",
    title: "Shopee台湾智能客服",
    label: "待补充项目素材",
    year: "2026",
    theme: "AI产品",
    summary:
      "面向跨境电商客服场景，规划从买家问题识别、订单/商品信息调用、自动回复到人工协同的智能客服工作流。",
    role: "AI产品方案、业务流程拆解、意图与任务流设计、效果指标规划",
    proof: ["意图识别", "人工接管", "知识库命中", "客服任务流"],
    metrics: ["响应效率", "转人工率", "可用回复率"],
    visual: "conversation",
  },
  {
    id: "ai-image",
    title: "AI智能生图系统",
    label: "跨境电商运营提效",
    year: "2025",
    theme: "AI产品",
    summary:
      "围绕服装上新快、素材非标、运营反复返工的问题，设计AI生图任务流、素材管理、生成审核与效果复盘。",
    role: "产品方案梳理、生成任务流设计、异常状态设计、效果评估口径",
    proof: ["任务队列", "生成失败处理", "图片审核", "风格一致性"],
    metrics: ["可用率", "返工率", "单图成本"],
    visual: "image",
  },
  {
    id: "policy-match",
    title: "政策智能匹配引擎",
    label: "遂企云/产业服务平台",
    year: "2025",
    theme: "AI产品",
    summary:
      "基于政策条件、企业画像和申报行为，帮助企业更快找到可申报政策，降低政策触达和理解成本。",
    role: "匹配逻辑设计、企业画像字段梳理、申报链路原型、测试验收",
    proof: ["企业画像", "政策标签", "规则匹配", "推荐解释"],
    metrics: ["推荐精准度", "申报转化", "咨询量下降"],
    visual: "matching",
  },
  {
    id: "suiqi-cloud",
    title: "遂企云企业公共服务平台",
    label: "数字政府重点项目",
    year: "2025-2026",
    theme: "复杂系统",
    summary:
      "从0到1设计政策申报、免申即享、专家评审、企业诉求闭环等模块，覆盖PC门户、H5与城市APP嵌入端。",
    role: "产品规划、需求文档、380+原型页面、测试验收",
    proof: ["申请-审批-评审-兑现", "企业诉求闭环", "多端适配", "专家端"],
    metrics: ["20+文档", "380+页面", "全流程上线"],
    visual: "government",
  },
  {
    id: "longgang",
    title: "龙岗区产业管理服务平台",
    label: "资金申报与拨付",
    year: "2024-2026",
    theme: "复杂系统",
    summary:
      "整合政策数据、企业数据和行为数据，设计资金申报、审核、拨付等一站式服务流程。",
    role: "高保真原型、流程引擎梳理、问题响应、操作手册",
    proof: ["表单引擎", "流程引擎", "资金拨付", "用户反馈闭环"],
    metrics: ["推荐精准度提升", "按期上线", "满意度提升"],
    visual: "dashboard",
  },
  {
    id: "taiqitong",
    title: "泰企通一企来办平台",
    label: "政企互动服务",
    year: "2024-2026",
    theme: "复杂系统",
    summary:
      "将政策、专项资金、高频事项和企业诉求集中到一个服务入口，支持政府端培训与持续迭代。",
    role: "0到1设计、100+高保真原型、功能说明书、客户培训",
    proof: ["企业服务入口", "免审即享", "专项资金", "政府端操作"],
    metrics: ["100+原型", "上线交付", "持续运维"],
    visual: "portal",
  },
  {
    id: "parking",
    title: "互享停智慧校园停车系统",
    label: "物联网小程序",
    year: "2022-2023",
    theme: "软硬件",
    summary:
      "利用智慧地锁、NB-IoT、车牌识别和小程序导航，解决校园停车难、乱停和新能源车位管理问题。",
    role: "创意构思、系统原型、团队管理、立项申请、测试推进",
    proof: ["智慧地锁", "车牌识别", "反向寻车", "远程控制"],
    metrics: ["30000元经费", "试点投放", "专利成果"],
    visual: "parking",
  },
  {
    id: "crab-ai",
    title: "AI识别自动化软壳蟹培育",
    label: "计算机视觉项目",
    year: "2021-2022",
    theme: "AI产品",
    summary:
      "基于YOLO模型、图像标注和K210边缘设备，实现软壳蟹蜕壳识别、自动报警和养殖状态监控。",
    role: "数据采集与标注、识别方案、技术文档、团队统筹",
    proof: ["YOLO识别", "边缘部署", "数据标注", "自动报警"],
    metrics: ["40000元经费", "IEEE论文", "样机协议"],
    visual: "vision",
  },
];

const archiveProjectOrder = [
  "taiqitong",
  "suiqi-cloud",
  "longgang",
];

const archiveImages: Record<string, string> = {
  taiqitong: "/archive-taiqitong.png",
  "suiqi-cloud": "/archive-suiqi-cloud.png",
  longgang: "/archive-longgang.png",
  "ai-service": "/archive-policy-calculator.png",
};

const archiveTitles: Record<string, string> = {
  taiqitong: "泰企通-一企来办平台",
  "suiqi-cloud": "遂企云-遂宁市企业公共服务云平台",
  longgang: "龙岗区-产业管理服务平台",
  "ai-service": "政策计算器",
};

const navItems = [
  { label: "Work", target: "work" },
  { label: "Competencies", target: "competencies" },
  { label: "About", target: "about" },
];

const competencyCards = [
  {
    title: "AI产品能力",
    text: "智能客服、AI生图、政策匹配、CV识别，把AI能力拆成能落地的产品流程。",
    tags: ["提示词流程", "任务设计", "效果评估"],
  },
  {
    title: "复杂系统能力",
    text: "熟悉政企服务、审批流、表单引擎和多端协同，能把复杂业务做成清晰路径。",
    tags: ["业务流程", "权限逻辑", "数据口径"],
  },
  {
    title: "产品交付能力",
    text: "原型、流程图、PRD、操作手册、培训材料和验收清单，可以支撑项目从0到上线。",
    tags: ["Axure原型", "Xmind流程", "PPT汇报"],
  },
  {
    title: "验证与复盘能力",
    text: "用上线结果、测试反馈、项目复盘和成果材料，证明方案不是停在文档里。",
    tags: ["结果复盘", "测试验收", "成果沉淀"],
  },
];

const playgroundCards = [
  { title: "政策计算器", image: "/playground-policy-calculator.png" },
  { title: "服务中心", image: "/playground-service-center.png" },
  { title: "事项查询", image: "/playground-matter-query.png" },
  { title: "政策列表", image: "/playground-policy-list.png" },
  { title: "表单填报", image: "/playground-form-fill.png" },
];

const experiences: Experience[] = [
  {
    id: "xinsheng",
    company: "深圳市鑫晟互联科技有限公司",
    role: "产品经理",
    date: "2024.04-2025.07",
    badge: "政务平台 · 产品交付",
    x: "36%",
    y: "20%",
    points: [
      "主导泰企通、遂企云、龙岗产业平台等项目的需求调研、流程梳理和高保真原型设计。",
      "独立输出政策申报、资金拨付、企业诉求、后台管理等复杂业务模块原型。",
      "完成操作手册、客户培训、测试验收与问题闭环，支撑项目按期上线。",
    ],
  },
  {
    id: "tengyun",
    company: "深圳市腾云驾悟科技有限公司",
    role: "项目助理",
    date: "2023.07-2024.09",
    badge: "项目管理 · 软硬件协同",
    x: "18%",
    y: "33%",
    points: [
      "负责项目立项、WBS任务拆解、里程碑计划和跨部门进度推进。",
      "对接采购、品质、生产与客户，跟进交付质量、风险和异常问题。",
      "建立问题跟踪表和经验总结文档，提升项目复盘与交付可控性。",
    ],
  },
  {
    id: "ai-edu",
    company: "深圳市利伯塔斯科技有限公司",
    role: "AI产品经理",
    date: "2026.04-至今",
    badge: "跨境电商 · AI产品",
    x: "72%",
    y: "29%",
    points: [
      "产品方案设计：负责跨境电商AI产品规划与需求分析，输出XMind业务逻辑以及高保真前端原型，围绕服装电商业务推进AI抠图、AI生图、AI客服等产品建设，完成业务流程梳理、产品方案、原型及需求文档输出。",
      "AI生图：负责商品图、测评图、印花图等AI生图产品设计，结合运营实际使用场景，持续优化生成流程、商品一致性、图片可用率及生成成本。",
      "智能客服：负责Shopee台湾站AI智能客服从0到1建设，梳理售前、售中、售后业务场景，完成Agent流程、Prompt、知识库、规则库、客服工作台及人工兜底机制设计。",
      "模型评估：参与模型选型、Prompt优化及AI效果评估，从生成质量、回复准确率、转人工率、处理效率、推理成本等维度持续优化产品效果。",
      "项目推进：负责需求评审、版本规划、测试验收及上线跟进，协调研发及业务团队推动产品落地和持续迭代。",
    ],
  },
  {
    id: "maker",
    company: "校园创客项目",
    role: "项目负责人/技术团队负责人",
    date: "2021.04-2023.01",
    badge: "AI识别 · 物联网",
    x: "32%",
    y: "68%",
    points: [
      "负责智慧校园停车系统从创意、原型、立项到试点投放的完整推进。",
      "参与软壳蟹AI识别项目，完成图像采集、数据标注、YOLO识别与边缘部署。",
      "产出论文、专利和创客项目成果，具备产品与技术结合的项目经验。",
    ],
  },
];

function VisualMock({ type }: { type: string }) {
  return (
    <div className={`visual-mock visual-${type}`} aria-label="项目截图占位">
      <div className="mock-top">
        <span />
        <span />
        <span />
      </div>
      <div className="mock-body">
        <div className="mock-sidebar">
          <i />
          <i />
          <i />
        </div>
        <div className="mock-main">
          <b />
          <strong />
          <em />
          <small />
        </div>
      </div>
    </div>
  );
}

function LoadingIntro() {
  return (
    <div className="loading-intro" aria-label="页面加载动画">
      <div className="loader-mark" aria-hidden="true">
        <img src="/loader-avatar.png" alt="" />
      </div>
      <p className="loader-title">
        {["Searching", "for", "jobs", "made", "me", "think"].map((word, index) => (
          <span key={word} style={{ "--word-index": index } as CSSProperties}>
            {word}
          </span>
        ))}
        <strong style={{ "--word-index": 6 } as CSSProperties}>different.</strong>
      </p>
      <div className="loader-bar" aria-hidden="true">
        <span />
      </div>
    </div>
  );
}

function ExperienceModal({
  experience,
  onClose,
}: {
  experience: Experience;
  onClose: () => void;
}) {
  const x = Number.parseFloat(experience.x);
  const y = Number.parseFloat(experience.y);
  const placeLeft = x > 58;
  const placeUp = y > 54;

  return (
    <div
      className={`experience-modal ${placeLeft ? "place-left" : "place-right"} ${placeUp ? "place-up" : "place-down"}`}
      role="dialog"
      aria-modal="false"
      style={{ "--panel-x": experience.x, "--panel-y": experience.y } as CSSProperties}
    >
      <button className="experience-backdrop" type="button" onClick={onClose} />
      <article
        className="experience-panel"
        onClick={(event: MouseEvent<HTMLElement>) => event.stopPropagation()}
      >
        <button className="experience-close" type="button" onClick={onClose}>
          ×
        </button>
        <div className="experience-head">
          <div className="experience-icon">{experience.company.slice(0, 1)}</div>
          <div>
            <h3>{experience.company}</h3>
            <p>{experience.role}</p>
          </div>
        </div>
        <span className="experience-date">{experience.date}</span>
        <span className="experience-badge">{experience.badge}</span>
        <ul>
          {experience.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </article>
    </div>
  );
}

export default function PortfolioClient() {
  const [lightbox, setLightbox] = useState<Project | null>(null);
  const [activeNav, setActiveNav] = useState("Work");
  const [bursts, setBursts] = useState<Burst[]>([]);
  const [showIntro, setShowIntro] = useState(true);
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [sceneOffset, setSceneOffset] = useState({ x: 0, y: 0 });
  const [cardOffset, setCardOffset] = useState({ x: 0, y: 0 });
  const [aiCardsVisible, setAiCardsVisible] = useState(false);
  const [archiveVisible, setArchiveVisible] = useState(false);
  const [competenciesVisible, setCompetenciesVisible] = useState(false);
  const [activePlayground, setActivePlayground] = useState<string | null>(null);
  const [greetingOpen, setGreetingOpen] = useState(false);
  const [darkProgress, setDarkProgress] = useState(0);
  const aiGridRef = useRef<HTMLDivElement | null>(null);
  const archiveRef = useRef<HTMLElement | null>(null);
  const competenciesRef = useRef<HTMLElement | null>(null);
  const competenciesContentRef = useRef<HTMLDivElement | null>(null);

  const archiveProjects = useMemo(
    () =>
      archiveProjectOrder
        .map((id) => projects.find((project) => project.id === id))
        .filter((project): project is Project => Boolean(project)),
    [],
  );

  const jumpTo = (target: string, label: string) => {
    setActiveNav(label);
    document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCityPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 8;
    setSceneOffset({ x, y });
  };

  const handleCardPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 10;
    setCardOffset({ x, y });
  };

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    const introTimer = window.setTimeout(() => setShowIntro(false), 3150);
    const handlePointerDown = (event: PointerEvent) => {
      const id = Date.now() + Math.random();
      setBursts((current) => [
        ...current.slice(-5),
        { id, x: event.clientX, y: event.clientY },
      ]);
      window.setTimeout(() => {
        setBursts((current) => current.filter((burst) => burst.id !== id));
      }, 760);
    };

    window.addEventListener("pointerdown", handlePointerDown);
    return () => {
      window.clearTimeout(introTimer);
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "auto";
      }
      window.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  useEffect(() => {
    const node = aiGridRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setAiCardsVisible(true);
        observer.disconnect();
      },
      { threshold: 0.28 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const node = archiveRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setArchiveVisible(true);
        observer.disconnect();
      },
      { threshold: 0.2 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const node = competenciesRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setCompetenciesVisible(true);
        observer.disconnect();
      },
      { rootMargin: "0px 0px -18% 0px", threshold: 0.08 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateDarkScene = () => {
      const node = competenciesRef.current;
      if (!node) return;

      const rect = node.getBoundingClientRect();
      const viewport = window.innerHeight || document.documentElement.clientHeight;
      const entering = clamp((viewport * 0.82 - rect.top) / (viewport * 0.36));
      const leaving = clamp((viewport * 0.64 - rect.bottom) / (viewport * 0.42));
      const progress = clamp(Math.min(entering, 1 - leaving));

      setDarkProgress(progress);
    };

    updateDarkScene();
    window.addEventListener("scroll", updateDarkScene, { passive: true });
    window.addEventListener("resize", updateDarkScene);
    return () => {
      window.removeEventListener("scroll", updateDarkScene);
      window.removeEventListener("resize", updateDarkScene);
    };
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((item) => ({ ...item, node: document.getElementById(item.target) }))
      .filter((item): item is { label: string; target: string; node: HTMLElement } =>
        Boolean(item.node),
      );

    const updateActiveNav = () => {
      const viewport = window.innerHeight || document.documentElement.clientHeight;
      const anchor = viewport * 0.42;
      let nextActive = "Work";

      sections.forEach((section) => {
        const rect = section.node.getBoundingClientRect();
        if (rect.top <= anchor && rect.bottom > anchor) {
          nextActive = section.label;
        }
      });

      const aboutNode = document.getElementById("about");
      if (aboutNode) {
        const aboutRect = aboutNode.getBoundingClientRect();
        if (aboutRect.top <= viewport * 0.58) {
          nextActive = "About";
        }
      }

      setActiveNav((current) => (current === nextActive ? current : nextActive));
    };

    updateActiveNav();
    window.addEventListener("scroll", updateActiveNav, { passive: true });
    window.addEventListener("resize", updateActiveNav);
    return () => {
      window.removeEventListener("scroll", updateActiveNav);
      window.removeEventListener("resize", updateActiveNav);
    };
  }, []);

  return (
    <main style={{ "--dark-progress": darkProgress } as CSSProperties}>
      {showIntro && <LoadingIntro />}
      <div className="dark-transition" aria-hidden="true" />
      <div className="ambient" aria-hidden="true">
        <span className="cloud cloud-one" />
        <span className="cloud cloud-two" />
        <span className="cloud cloud-three" />
        <span className="cloud cloud-four" />
      </div>
      <div className="click-layer" aria-hidden="true">
        {bursts.map((burst) => (
          <span
            className="click-burst"
            key={burst.id}
            style={{ "--x": `${burst.x}px`, "--y": `${burst.y}px` } as CSSProperties}
          >
            {Array.from({ length: 10 }).map((_, index) => (
              <i key={index} style={{ "--i": index } as CSSProperties} />
            ))}
          </span>
        ))}
      </div>
      <nav className={`site-nav ${darkProgress > 0.48 ? "is-dark" : ""}`}>
        <div className="nav-switch" aria-label="作品集栏目切换">
          <button className="nav-logo" type="button" onClick={() => jumpTo("top", "Home")}>
            <img src="/design-it-logo.png" alt="design.it" />
          </button>
          {navItems.map((item) => (
            <button
              className={activeNav === item.label ? "active" : ""}
              key={item.label}
              type="button"
              onClick={() => jumpTo(item.target, item.label)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      <section className="intro-hero" id="top">
        <button className="nav-status hero-status" type="button" onClick={() => jumpTo("top", "Work")}>
          <b>Right Now:</b>
          <span>↳ Turning ideas into products.</span>
        </button>
        <div className="nav-meta hero-meta" aria-label="当前状态">
          <span>深圳</span>
          <i />
          <span>AI产品经理</span>
        </div>
        <div className="intro-copy">
          <span className="hello-pill">
            <span className="wave-hand" aria-hidden="true">👋</span>
            嗨，我是李臻炀
          </span>
          <h1>
            <span className="title-line">Product Manager</span>
            <span className="title-line"><em>Who</em> designs,</span>
            <span className="title-line">builds & grows.</span>
          </h1>
          <p>
            我把<span className="copy-highlight">复杂</span>业务拆成能上线的产品，<span className="copy-highlight">关注流程、效率和真实交付。</span>
          </p>
          <button type="button" onClick={() => jumpTo("work", "Work")}>
            Go All in
            <span>↓</span>
          </button>
        </div>
        <div
          className="intro-card-stack"
          aria-hidden="true"
          onPointerMove={handleCardPointerMove}
          onPointerLeave={() => setCardOffset({ x: 0, y: 0 })}
          style={{
            "--card-x": `${cardOffset.x}px`,
            "--card-y": `${cardOffset.y}px`,
          } as CSSProperties}
        >
          <img className="real-card card-left" src="/card-spade.png" alt="" />
          <img className="real-card card-mid" src="/card-heart.png" alt="" />
          <img className="real-card card-right" src="/card-diamond.png" alt="" />
          <div className="portrait-card">
            <span>I AM VIMTY</span>
            <strong>AI PM</strong>
          </div>
        </div>
      </section>

      <div className="work-canvas" id="work">
      <section className="ticker" aria-label="能力关键词">
        <div>
          <span>智能客服</span>
          <span>AI生图</span>
          <span>政策匹配</span>
          <span>复杂审批流</span>
          <span>市场调研</span>
          <span>项目管理</span>
          <span>ERP协同</span>
          <span>原型设计</span>
          <span>测试验收</span>
          <span>项目交付</span>
        </div>
      </section>

      <section className="ai-section" id="ai">
        <div className="section-head">
          <img className="case-studies-title" src="/case-studies-title.png" alt="Case Studies" />
          <h2>Selected Work.</h2>
        </div>
        <div className={`ai-grid ${aiCardsVisible ? "is-visible" : ""}`} ref={aiGridRef}>
          <article className="ai-card">
            <div className="ai-card-media">
              <img src="/ai-customer-service.png" alt="AI智能客服项目展示" />
            </div>
            <div className="ai-card-copy">
              <h3>AI智能客服系统</h3>
              <p>从0到1搭建业务型AI客服系统，覆盖买家问题理解、业务判断、实时数据查询与自动回复。</p>
            </div>
          </article>
          <article className="ai-card">
            <div className="ai-card-media">
              <img src="/ai-image-generation.png" alt="AI生图项目展示" />
            </div>
            <div className="ai-card-copy">
              <h3>AI商品视觉生成系统</h3>
              <p>围绕商品图、测评图、印花图等电商素材场景，提升图片生产效率并降低制作成本。</p>
            </div>
          </article>
        </div>
      </section>

      <section className={`archive-section ${archiveVisible ? "is-visible" : ""}`} id="archive" ref={archiveRef}>
        <div className="archive-grid">
          {archiveProjects.map((project) => (
            <button key={project.id} type="button" onClick={() => setLightbox(project)}>
              {archiveImages[project.id] ? (
                <img className="archive-thumb" src={archiveImages[project.id]} alt={`${project.title}项目截图`} />
              ) : (
                <VisualMock type={project.visual} />
              )}
              <span className="archive-caption">
                {archiveTitles[project.id] ?? project.title}
                <i aria-hidden="true">→</i>
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="work-section" aria-label="工作经历地图">
        <h2 className="work-section-title">
          Where this work happened<span>.</span>
        </h2>
        <div
          className="city-scene"
          aria-label="可点击的工作经历地图"
          onClick={() => selectedExperience && setSelectedExperience(null)}
          onPointerMove={handleCityPointerMove}
          onPointerLeave={() => setSceneOffset({ x: 0, y: 0 })}
        >
          <div
            className="city-map-layer"
            style={
              {
                "--mx": `${sceneOffset.x}px`,
                "--my": `${sceneOffset.y}px`,
                "--focus-scale": selectedExperience ? 1.045 : 1,
              } as CSSProperties
            }
          />
          <div className="scene-mist mist-one" />
          <div className="scene-mist mist-two" />
          <div className="scene-mist mist-three" />
          <div className="scene-mist mist-four" />
          {experiences.map((experience) => (
            <button
              className="experience-node"
              key={experience.id}
              style={{ "--x": experience.x, "--y": experience.y } as CSSProperties}
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setSelectedExperience(experience);
              }}
              aria-label={`查看${experience.company}工作经历`}
            >
              <span />
            </button>
          ))}
          <button
            className="scene-copy"
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setSelectedExperience(experiences[0]);
            }}
          >
            <p>THIS LOT IS OPEN</p>
            <h1>Bet on me. <strong>Let’s build.</strong></h1>
          </button>
          {selectedExperience && (
            <ExperienceModal
              experience={selectedExperience}
              onClose={() => setSelectedExperience(null)}
            />
          )}
        </div>
      </section>

      <section className="visual-playground-section" aria-label="视觉实验展示">
        <div className="visual-playground-head">
          <img className="outcome-title" src="/outcome-title.png" alt="Outcome" />
        </div>
        <p className="playground-note">把复杂流程，整理成可以落地的产品资产。</p>
        <div className={`playground-strip ${activePlayground ? "has-active" : ""}`}>
          {playgroundCards.map((card, index) => (
            <article
              className={`playground-card ${activePlayground === card.title ? "is-active" : ""}`}
              key={card.title}
              onClick={() => setActivePlayground((current) => (current === card.title ? null : card.title))}
              style={
                {
                  "--card-y": `${index % 2 === 0 ? 0 : 22}px`,
                  "--card-r": `${(index - 2) * 0.45}deg`,
                } as CSSProperties
              }
            >
              <img src={card.image} alt={`${card.title}展示图`} />
              <span>{card.title}</span>
            </article>
          ))}
        </div>
        <button className="playground-more" type="button" onClick={() => jumpTo("competencies", "Competencies")}>
          查看更多能力
          <span>→</span>
        </button>
      </section>

      <section className="competencies-section" id="competencies" ref={competenciesRef}>
        <div className="competencies-spacer" aria-hidden="true" />
        <div
          className={`competencies-inner ${competenciesVisible ? "is-visible" : ""}`}
          ref={competenciesContentRef}
        >
          <div className="competencies-copy">
            <img className="competencies-title-mark" src="/competencies-title.png" alt="Competencies" />
            <h2>
              Product proof, certificates, and my <span>edge.</span>
            </h2>
            <small>
              让能力变得真实的东西！
            </small>
          </div>
          <div className="competencies-grid">
            {competencyCards.map((card) => (
              <article className="competency-card" key={card.title}>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
                <div>
                  {card.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      </div>

      <section className="hello-section" aria-label="打招呼">
        <div className="hello-inner">
          <h2>Let's have coffee?</h2>
          <div className={`hello-card ${greetingOpen ? "is-open" : ""}`}>
            <div className="hello-row">
              <img src="/loader-avatar.png" alt="李臻炀头像" />
              <p>你好啊~</p>
            </div>
            <div className="hello-actions">
              <button type="button" onClick={() => setGreetingOpen(true)}>
                打个招呼
                <span>👋</span>
              </button>
            </div>
            <div className="hello-reply">
              <img src="/loader-avatar.png" alt="" />
              <p>
                你好，很高兴认识你！很期待可以与您合作！
                <a href="mailto:2294705637@qq.com">2294705637@qq.com</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section" id="about">
        <div>
          <img className="about-title-mark" src="/about-title.png" alt="About" />
          <h2>我不是只画页面的产品经理。</h2>
          <img className="about-f1-mark" src="/about-f1-right-now.png" alt="F1 right now." />
        </div>
        <p className="about-bio">
          {Array.from(aboutBio).map((char, index) => (
            <span
              className={char === " " ? "about-space" : ""}
              key={`${char}-${index}`}
              style={{ "--char-index": index } as CSSProperties}
            >
              {char}
            </span>
          ))}
        </p>
        <div className="about-stats">
          <span><b>500+</b>原型页面</span>
          <span><b>20+</b>需求/设计/测试文档</span>
          <span><b>10+</b>项目经验</span>
        </div>
      </section>

      <footer>
        <span>李臻炀 · AI产品经理作品集</span>
        <a href="mailto:2294705637@qq.com">2294705637@qq.com</a>
      </footer>

      {lightbox && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="项目截图预览">
          <button className="lightbox-backdrop" type="button" onClick={() => setLightbox(null)} />
          <div className="lightbox-panel">
            <button className="close" type="button" onClick={() => setLightbox(null)}>
              关闭
            </button>
            <VisualMock type={lightbox.visual} />
            <span>{lightbox.theme}</span>
            <h3>{lightbox.title}</h3>
            <p>{lightbox.summary}</p>
            <small>这里后续替换为你的真实项目截图、原型图、流程图或线上链接。</small>
          </div>
        </div>
      )}
    </main>
  );
}
