import {useState} from 'react';
import {
  ArrowRight,
  ArrowUp,
  BookOpen,
  Check,
  Copy,
  Expand,
  ExternalLink,
  GraduationCap,
  Mail,
  MapPin,
  Send,
  Sparkles,
  User,
} from 'lucide-react';
import {ProjectModal} from './components/ProjectModal';
import {ResilientImage} from './components/ResilientImage';
import {TactileButton} from './components/TactileButton';
import {
  DEFAULT_PROFILE,
  PROJECTS_DATA,
  SKILLS_DATA,
  type ProjectItem,
  type SkillItem,
} from './data/portfolioData';
import {playTactileClick} from './utils/tactileAudio';

type SkillFilter = 'All' | 'Technical' | 'Design & Tools';

export default function App() {
  const profile = DEFAULT_PROFILE;
  const soundEnabled = false;
  const [skillFilter, setSkillFilter] = useState<SkillFilter>('All');
  const [selectedSkill, setSelectedSkill] = useState<SkillItem>(SKILLS_DATA[2]);
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [senderMessage, setSenderMessage] = useState('');
  const [formError, setFormError] = useState('');
  const [messageSent, setMessageSent] = useState(false);

  const filteredSkills =
    skillFilter === 'All'
      ? SKILLS_DATA
      : SKILLS_DATA.filter((skill) => skill.category === skillFilter);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopiedEmail(true);
      playTactileClick(soundEnabled, 'confirm');
      window.setTimeout(() => setCopiedEmail(false), 2400);
    } catch {
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2400);
    }
  };

  const handleSkillFilterChange = (nextFilter: SkillFilter) => {
    setSkillFilter(nextFilter);
    const nextList =
      nextFilter === 'All'
        ? SKILLS_DATA
        : SKILLS_DATA.filter((skill) => skill.category === nextFilter);
    if (nextList.length > 0 && !nextList.some((item) => item.id === selectedSkill.id)) {
      setSelectedSkill(nextList[0]);
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedName = senderName.trim();
    const trimmedEmail = senderEmail.trim();
    const trimmedMessage = senderMessage.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setFormError('Please fill in your name, email address, and message before sending.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setFormError('Please enter a valid email address.');
      return;
    }

    setFormError('');
    setMessageSent(true);
    playTactileClick(soundEnabled, 'confirm');
  };

  const handleResetForm = () => {
    setSenderName('');
    setSenderEmail('');
    setSenderMessage('');
    setFormError('');
    setMessageSent(false);
  };

  const mailtoHref = `mailto:${profile.email}?subject=${encodeURIComponent(
    `Portfolio Inquiry from ${senderName.trim() || 'Visitor'}`
  )}&body=${encodeURIComponent(senderMessage.trim())}`;

  return (
    <div
      id="top"
      className="min-h-screen bg-[radial-gradient(ellipse_at_top,#320914_0%,#1A050A_48%,#120307_100%)] text-[#F7E5E2]"
    >
      {/* Strict 3-Zone Top Bar */}
      <header className="sticky top-0 z-40 border-b border-[#EBC8C3]/10 bg-[#160509]/88 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-6 py-3.5">
          <a
            href="#top"
            className="font-display text-xl font-semibold tracking-tight text-[#F7E5E2] hover:text-[#EBC8C3] transition-colors whitespace-nowrap shrink-0"
          >
            {profile.name}
          </a>

          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-7 text-xs font-medium tracking-wider text-[#C8A6A2]"
          >
            <a
              href="#home"
              className="py-1 border-b border-transparent hover:border-[#EBC8C3] hover:text-[#F7E5E2] transition-colors whitespace-nowrap shrink-0"
            >
              Home
            </a>
            <a
              href="#about"
              className="py-1 border-b border-transparent hover:border-[#EBC8C3] hover:text-[#F7E5E2] transition-colors whitespace-nowrap shrink-0"
            >
              About
            </a>
            <a
              href="#skills"
              className="py-1 border-b border-transparent hover:border-[#EBC8C3] hover:text-[#F7E5E2] transition-colors whitespace-nowrap shrink-0"
            >
              Skills
            </a>
            <a
              href="#projects"
              className="py-1 border-b border-transparent hover:border-[#EBC8C3] hover:text-[#F7E5E2] transition-colors whitespace-nowrap shrink-0"
            >
              Projects
            </a>
            <a
              href="#contact"
              className="py-1 border-b border-transparent hover:border-[#EBC8C3] hover:text-[#F7E5E2] transition-colors whitespace-nowrap shrink-0"
            >
              Contact
            </a>
          </nav>

          <div className="flex items-center shrink-0">
            <TactileButton
              as="a"
              href="#contact"
              variant="secondary"
              size="sm"
              soundEnabled={soundEnabled}
            >
              <span>Let’s Talk</span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </TactileButton>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section id="home" className="mx-auto max-w-6xl px-6 pt-12 pb-16 sm:pt-16 sm:pb-20">
          <div className="grid gap-8 sm:grid-cols-12 sm:items-center lg:gap-12">
            <div className="sm:col-span-7 space-y-6">
              <div className="space-y-2">
                <p className="text-xs font-medium tracking-[0.14em] text-[#C8A6A2]">
                  {profile.course}
                </p>

                <h1
                  className="font-display font-medium tracking-tight text-[#EBC8C3] leading-[0.95]"
                  style={{
                    fontSize: 'clamp(2.25rem, 4.8vw, 4.65rem)',
                    textWrap: 'balance',
                  }}
                >
                  Crafting Digital{' '}
                  <span className="block font-semibold text-[#F7E5E2]">Experiences</span>
                  <span className="block italic font-normal text-[#EBC8C3]">
                    That Stand Out.
                  </span>
                </h1>
              </div>

              <p className="text-xs font-medium tracking-[0.18em] text-[#C8A6A2]">
                Web Development · UI/UX Design · IT Portfolio
              </p>

              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <TactileButton
                  as="a"
                  href="#projects"
                  variant="primary"
                  size="lg"
                  soundEnabled={soundEnabled}
                >
                  <span>View Work</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </TactileButton>

                <TactileButton
                  as="a"
                  href="#about"
                  variant="secondary"
                  size="lg"
                  soundEnabled={soundEnabled}
                >
                  <span>About Me</span>
                </TactileButton>
              </div>
            </div>

            {/* Formal Portrait on Right Side of Hero Title */}
            <div className="sm:col-span-5 relative flex justify-center sm:justify-end">
              <div
                aria-hidden="true"
                className="absolute inset-4 rounded-full bg-[#5C1223]/55 blur-2xl"
              />
              <div className="relative w-full max-w-[340px] overflow-hidden rounded-[2rem] border border-[#EBC8C3]/22 bg-[#2A0710] shadow-[0_24px_60px_-16px_rgba(0,0,0,0.7)]">
                <ResilientImage
                  src={profile.heroImage}
                  alt={profile.heroImageAlt}
                  title={profile.name}
                  className="w-full aspect-square object-cover object-top"
                />
                <div className="border-t border-[#EBC8C3]/12 bg-[#23080F]/95 px-5 py-3 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="font-display text-lg font-semibold text-[#F7E5E2] truncate">
                      {profile.name}
                    </p>
                    <p className="text-xs text-[#C8A6A2] truncate">{profile.yearLevel}</p>
                  </div>
                  <span className="font-mono text-xs tabular-nums text-[#EBC8C3]">2026</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: About Me & Personal Information */}
        <section id="about" className="mx-auto max-w-6xl px-6 py-16 border-t border-[#EBC8C3]/10">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
            {/* Left Intro & Edit Personal Info Button */}
            <div className="lg:col-span-5 space-y-5">
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium tracking-[0.16em] text-[#C8A6A2]">
                  About Me
                </span>
                <span className="h-px w-12 bg-[#EBC8C3]/35" aria-hidden="true" />
              </div>

              <h2 className="font-display text-4xl sm:text-5xl font-medium tracking-tight text-[#F7E5E2] leading-[1.05]">
                Code meets <span className="italic text-[#EBC8C3]">thoughtful craft.</span>
              </h2>

              <p className="text-sm leading-relaxed text-[#C8A6A2] max-w-[56ch]">
                {profile.bio}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <TactileButton
                  variant="primary"
                  size="md"
                  soundEnabled={soundEnabled}
                  soundTone="confirm"
                  onClick={handleCopyEmail}
                >
                  {copiedEmail ? (
                    <>
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Copied Email</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Copy Email</span>
                    </>
                  )}
                </TactileButton>

                <TactileButton
                  as="a"
                  href="#projects"
                  variant="secondary"
                  size="md"
                  soundEnabled={soundEnabled}
                >
                  <span>Explore Projects</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </TactileButton>
              </div>
            </div>

            {/* Right 3 Burgundy Personal Information Cards */}
            <div className="lg:col-span-7 grid gap-4 sm:grid-cols-3">
              {/* Card 1: Personal Identity */}
              <div className="rounded-2xl bg-[#3E0D18] border border-[#EBC8C3]/15 p-5 flex flex-col justify-between gap-5 shadow-[0_12px_28px_-14px_rgba(0,0,0,0.6)]">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#EBC8C3]/25 text-[#EBC8C3]">
                  <User className="h-4 w-4" aria-hidden="true" />
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-[#C8A6A2]">Personal Profile</p>
                    <h3 className="font-display text-2xl font-semibold text-[#F7E5E2] mt-0.5">
                      {profile.name}
                    </h3>
                  </div>
                  <dl className="space-y-2 text-xs">
                    <div>
                      <dt className="text-[#C8A6A2]">Location</dt>
                      <dd className="font-medium text-[#F7E5E2]">{profile.location}</dd>
                    </div>
                    <div>
                      <dt className="text-[#C8A6A2]">Languages</dt>
                      <dd className="font-medium text-[#F7E5E2]">{profile.languages}</dd>
                    </div>
                  </dl>
                </div>
              </div>

              {/* Card 2: Education & Track */}
              <div className="rounded-2xl bg-[#3E0D18] border border-[#EBC8C3]/15 p-5 flex flex-col justify-between gap-5 shadow-[0_12px_28px_-14px_rgba(0,0,0,0.6)]">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#EBC8C3]/25 text-[#EBC8C3]">
                  <BookOpen className="h-4 w-4" aria-hidden="true" />
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-[#C8A6A2]">Education</p>
                    <h3 className="font-display text-2xl font-semibold text-[#F7E5E2] mt-0.5">
                      {profile.yearLevel}
                    </h3>
                  </div>
                  <dl className="space-y-2 text-xs">
                    <div>
                      <dt className="text-[#C8A6A2]">Program</dt>
                      <dd className="font-medium text-[#F7E5E2] leading-snug">{profile.course}</dd>
                    </div>
                    <div>
                      <dt className="text-[#C8A6A2]">Focus</dt>
                      <dd className="font-medium text-[#F7E5E2] leading-snug">
                        {profile.focusTrack}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              {/* Card 3: Interests & Availability */}
              <div className="rounded-2xl bg-[#3E0D18] border border-[#EBC8C3]/15 p-5 flex flex-col justify-between gap-5 shadow-[0_12px_28px_-14px_rgba(0,0,0,0.6)]">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#EBC8C3]/25 text-[#EBC8C3]">
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-[#C8A6A2]">Interests & Status</p>
                    <h3 className="font-display text-2xl font-semibold text-[#F7E5E2] mt-0.5">
                      Open to Work
                    </h3>
                  </div>
                  <dl className="space-y-2 text-xs">
                    <div>
                      <dt className="text-[#C8A6A2]">Interests</dt>
                      <dd className="font-medium text-[#F7E5E2] leading-snug">
                        {profile.interests}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[#C8A6A2]">Availability</dt>
                      <dd className="font-medium text-[#F7E5E2] leading-snug">
                        {profile.availability}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Expanded Educational Background Details */}
          <div className="mt-12 pt-10 border-t border-[#EBC8C3]/10">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#EBC8C3]/25 bg-[#3E0D18] text-[#EBC8C3]">
                  <GraduationCap className="h-4 w-4" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-medium tracking-[0.12em] text-[#C8A6A2]">
                    Academic Profile
                  </p>
                  <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#F7E5E2]">
                    Educational Background
                  </h3>
                </div>
              </div>
              <span className="text-xs font-medium text-[#EBC8C3]">
                BS Information Technology · Web & UI/UX Track
              </span>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {profile.educationBackground.map((edu) => (
                <div
                  key={edu.level}
                  className="rounded-2xl bg-[#26080F] border border-[#EBC8C3]/14 p-6 space-y-3.5 shadow-[0_12px_28px_-14px_rgba(0,0,0,0.6)]"
                >
                  <div className="flex items-center justify-between gap-3 text-xs text-[#C8A6A2]">
                    <span className="font-medium text-[#EBC8C3]">{edu.level}</span>
                    <span>{edu.status}</span>
                  </div>

                  <h4 className="font-display text-2xl font-semibold text-[#F7E5E2] leading-snug">
                    {edu.program}
                  </h4>

                  <dl className="space-y-2.5 pt-1 text-xs leading-relaxed">
                    <div>
                      <dt className="text-[#C8A6A2]">Specialization & Focus</dt>
                      <dd className="text-[#F7E5E2] font-medium mt-0.5">{edu.focus}</dd>
                    </div>
                    <div>
                      <dt className="text-[#C8A6A2]">Relevant Coursework</dt>
                      <dd className="text-[#C8A6A2] mt-0.5">{edu.coursework}</dd>
                    </div>
                    <div>
                      <dt className="text-[#C8A6A2]">Academic Outputs</dt>
                      <dd className="text-[#C8A6A2] mt-0.5">{edu.highlights}</dd>
                    </div>
                  </dl>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 2: Skills */}
        <section id="skills" className="mx-auto max-w-6xl px-6 py-16 border-t border-[#EBC8C3]/10">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="space-y-2 max-w-xl">
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium tracking-[0.16em] text-[#C8A6A2]">
                  My Capabilities
                </span>
                <span className="h-px w-12 bg-[#EBC8C3]/35" aria-hidden="true" />
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-[#F7E5E2]">
                Technical & <span className="italic text-[#EBC8C3]">Design Skills</span>
              </h2>
              <p className="text-sm leading-relaxed text-[#C8A6A2]">
                Select any category or click a skill button below to see how I apply it across my projects.
              </p>
            </div>

            {/* Interactive Tactile Filter Tabs */}
            <div
              role="group"
              aria-label="Filter skills by category"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#26080F] p-1.5 border border-[#EBC8C3]/15 self-start md:self-auto"
            >
              {(['All', 'Technical', 'Design & Tools'] as const).map((tab) => {
                const isActive = skillFilter === tab;
                const label = tab === 'All' ? 'All Skills' : tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => {
                      playTactileClick(soundEnabled, 'tab');
                      handleSkillFilterChange(tab);
                    }}
                    className={`min-h-[40px] px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer transition-[transform,background-color,color,box-shadow] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EBC8C3] active:translate-y-[1px] ${
                      isActive
                        ? 'bg-[#EBC8C3] text-[#1D060B] shadow-[0_2px_0_#9B6F6C]'
                        : 'text-[#C8A6A2] hover:text-[#F7E5E2] hover:bg-[#3E0D18]/60'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {filteredSkills.map((skill) => {
              const isSelected = selectedSkill.id === skill.id;
              return (
                <button
                  key={skill.id}
                  type="button"
                  onClick={() => {
                    playTactileClick(soundEnabled, 'press');
                    setSelectedSkill(skill);
                  }}
                  aria-pressed={isSelected}
                  className={`text-left rounded-2xl p-5 cursor-pointer transition-[transform,box-shadow,background-color,border-color] duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EBC8C3] focus-visible:ring-offset-2 focus-visible:ring-offset-[#160509] active:translate-y-[3px] ${
                    isSelected
                      ? 'bg-[#EBC8C3] text-[#1D060B] border border-[#F7E5E2] shadow-[0_4px_0_#9B6F6C,0_14px_28px_-10px_rgba(0,0,0,0.6)] active:shadow-[0_1px_0_#9B6F6C]'
                      : 'bg-[#2B0811] text-[#F7E5E2] border border-[#EBC8C3]/15 shadow-[0_4px_0_#0D0205] hover:bg-[#3E0D18] hover:border-[#EBC8C3]/35 hover:-translate-y-[1px] hover:shadow-[0_5px_0_#0D0205] active:shadow-[0_1px_0_#0D0205]'
                  }`}
                >
                  <p
                    className={`text-xs font-medium ${
                      isSelected ? 'text-[#5C1D2A]' : 'text-[#C8A6A2]'
                    }`}
                  >
                    {skill.category} · {skill.level}
                  </p>
                  <h3 className="font-display text-2xl font-semibold tracking-tight mt-1.5">
                    {skill.name}
                  </h3>
                  <p
                    className={`mt-2 text-xs leading-relaxed ${
                      isSelected ? 'text-[#3A0C16]' : 'text-[#C8A6A2]'
                    }`}
                  >
                    {skill.summary}
                  </p>
                </button>
              );
            })}
          </div>

          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between rounded-2xl bg-[#26080F] px-6 py-4 border border-[#EBC8C3]/12">
            <div className="text-sm text-[#F7E5E2]">
              <span className="font-semibold text-[#EBC8C3]">Selected Skill:</span>{' '}
              <span className="font-semibold">{selectedSkill.name}</span>
              <span className="text-[#C8A6A2]"> — Applied in {selectedSkill.appliedIn}</span>
            </div>
            <span className="text-xs font-medium text-[#C8A6A2] whitespace-nowrap shrink-0 tabular-nums">
              {filteredSkills.length} skills displayed
            </span>
          </div>
        </section>

        {/* Section 3: Projects */}
        <section id="projects" className="mx-auto max-w-6xl px-6 py-16 border-t border-[#EBC8C3]/10">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium tracking-[0.16em] text-[#C8A6A2]">
                Featured Work
              </span>
              <span className="h-px w-12 bg-[#EBC8C3]/35" aria-hidden="true" />
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-[#F7E5E2]">
              Selected <span className="italic text-[#EBC8C3]">Projects</span>
            </h2>
            <p className="text-sm leading-relaxed text-[#C8A6A2]">
              Click any screenshot or button to preview project details, tools used, and repository links.
            </p>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {PROJECTS_DATA.map((project) => (
              <article
                key={project.id}
                className="flex flex-col justify-between rounded-2xl bg-[#26080F] border border-[#EBC8C3]/14 p-5 sm:p-6 shadow-[0_14px_32px_-16px_rgba(0,0,0,0.65)]"
              >
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      playTactileClick(soundEnabled, 'press');
                      setActiveProject(project);
                    }}
                    aria-label={`Inspect screenshot for ${project.title}`}
                    className="group block w-full overflow-hidden rounded-xl border border-[#EBC8C3]/15 bg-[#090204] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EBC8C3]"
                  >
                    <ResilientImage
                      src={project.screenshot}
                      alt={project.screenshotAlt}
                      title={project.title}
                      className={`w-full aspect-[16/10] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] ${
                        project.imageFit === 'contain' ? 'object-contain' : 'object-cover object-top'
                      }`}
                    />
                  </button>

                  <div className="mt-5 space-y-2.5">
                    <div className="flex items-center gap-2 text-xs text-[#C8A6A2]">
                      <span className="font-mono tabular-nums text-[#EBC8C3]">{project.number}</span>
                      <span aria-hidden="true">·</span>
                      <span className="truncate">{project.role}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono tabular-nums">{project.year}</span>
                    </div>

                    <h3 className="font-display text-2xl sm:text-[1.7rem] font-semibold tracking-tight text-[#F7E5E2]">
                      {project.title}
                    </h3>

                    <p className="text-sm leading-relaxed text-[#C8A6A2]">
                      {project.shortDescription}
                    </p>

                    <p className="pt-1 text-xs font-medium text-[#EBC8C3]">
                      <span className="text-[#C8A6A2]">Tools: </span>
                      {project.tools.join(' · ')}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3 pt-4 border-t border-[#EBC8C3]/12">
                  <TactileButton
                    variant="primary"
                    size="sm"
                    soundEnabled={soundEnabled}
                    onClick={() => setActiveProject(project)}
                  >
                    <Expand className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>View Project</span>
                  </TactileButton>

                  <TactileButton
                    as="a"
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="secondary"
                    size="sm"
                    soundEnabled={soundEnabled}
                  >
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{project.linkLabel ?? 'Visit Site'}</span>
                  </TactileButton>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Section 4: Contact (Burgundy Banner Inspired by Reference) */}
        <section id="contact" className="mx-auto max-w-6xl px-6 py-16 border-t border-[#EBC8C3]/10">
          <div className="grid gap-10 rounded-2xl bg-[#3E0D18] border border-[#EBC8C3]/18 p-6 sm:p-10 shadow-[0_20px_50px_-18px_rgba(0,0,0,0.75)] lg:grid-cols-12">
            <div className="lg:col-span-5 flex flex-col justify-between gap-8">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium tracking-[0.16em] text-[#EBC8C3]">
                    Let’s Connect
                  </span>
                  <span className="h-px w-12 bg-[#EBC8C3]/40" aria-hidden="true" />
                </div>
                <h2 className="font-display text-4xl font-medium tracking-tight text-[#F7E5E2] leading-[1.05]">
                  Ready to build something <span className="italic text-[#EBC8C3]">meaningful?</span>
                </h2>
                <p className="text-sm leading-relaxed text-[#EBC8C3]/85">
                  Feel free to reach out for collaborations, IT student projects, or internship opportunities.
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2.5 text-sm text-[#F7E5E2]">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-[#EBC8C3] shrink-0" aria-hidden="true" />
                    <a
                      href={`mailto:${profile.email}`}
                      className="hover:underline underline-offset-4 break-all"
                    >
                      {profile.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-[#C8A6A2]">
                    <BookOpen className="h-4 w-4 text-[#EBC8C3] shrink-0" aria-hidden="true" />
                    <span>{profile.course}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#C8A6A2]">
                    <MapPin className="h-4 w-4 text-[#EBC8C3] shrink-0" aria-hidden="true" />
                    <span>{profile.location}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <TactileButton
                    variant="primary"
                    size="md"
                    soundEnabled={soundEnabled}
                    soundTone="confirm"
                    onClick={handleCopyEmail}
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="h-4 w-4" aria-hidden="true" />
                        <span>Email Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" aria-hidden="true" />
                        <span>Copy Email</span>
                      </>
                    )}
                  </TactileButton>

                  <TactileButton
                    as="a"
                    href={`mailto:${profile.email}`}
                    variant="secondary"
                    size="md"
                    soundEnabled={soundEnabled}
                  >
                    <span>Open Mail App</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </TactileButton>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              {messageSent ? (
                <div className="flex h-full flex-col justify-center gap-5 rounded-xl bg-[#26080F] border border-[#EBC8C3]/15 p-6 sm:p-8">
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-[#EBC8C3]">Message Ready</p>
                    <h3 className="font-display text-3xl font-semibold text-[#F7E5E2]">
                      Thanks, {senderName}!
                    </h3>
                    <p className="text-sm leading-relaxed text-[#C8A6A2]">
                      Your note is prepared. Click below to open it in your default email app addressed to{' '}
                      <span className="font-semibold text-[#F7E5E2]">{profile.email}</span>.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <TactileButton
                      as="a"
                      href={mailtoHref}
                      variant="primary"
                      size="md"
                      soundEnabled={soundEnabled}
                    >
                      <Mail className="h-4 w-4" aria-hidden="true" />
                      <span>Send via Email App</span>
                    </TactileButton>

                    <TactileButton
                      variant="secondary"
                      size="md"
                      soundEnabled={soundEnabled}
                      soundTone="tab"
                      onClick={handleResetForm}
                    >
                      <span>Write Another Note</span>
                    </TactileButton>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleFormSubmit}
                  noValidate
                  className="space-y-4 rounded-xl bg-[#26080F]/90 border border-[#EBC8C3]/14 p-5 sm:p-6"
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-medium text-[#EBC8C3] mb-1.5"
                      >
                        Your Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        placeholder="Alex Santos"
                        className="w-full min-h-[44px] rounded-xl border border-[#EBC8C3]/20 bg-[#160509] px-4 py-2.5 text-sm text-[#F7E5E2] placeholder:text-[#C8A6A2]/45 focus:border-[#EBC8C3] focus:outline-none focus:ring-2 focus:ring-[#EBC8C3]/20 transition-colors"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-medium text-[#EBC8C3] mb-1.5"
                      >
                        Your Email
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={senderEmail}
                        onChange={(e) => setSenderEmail(e.target.value)}
                        placeholder="alex@example.com"
                        className="w-full min-h-[44px] rounded-xl border border-[#EBC8C3]/20 bg-[#160509] px-4 py-2.5 text-sm text-[#F7E5E2] placeholder:text-[#C8A6A2]/45 focus:border-[#EBC8C3] focus:outline-none focus:ring-2 focus:ring-[#EBC8C3]/20 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-medium text-[#EBC8C3] mb-1.5"
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={senderMessage}
                      onChange={(e) => setSenderMessage(e.target.value)}
                      placeholder="Write a quick message or inquiry..."
                      className="w-full rounded-xl border border-[#EBC8C3]/20 bg-[#160509] px-4 py-3 text-sm text-[#F7E5E2] placeholder:text-[#C8A6A2]/45 focus:border-[#EBC8C3] focus:outline-none focus:ring-2 focus:ring-[#EBC8C3]/20 transition-colors resize-y"
                    />
                  </div>

                  {formError ? (
                    <p role="alert" className="text-xs font-medium text-[#F7E5E2]">
                      {formError}
                    </p>
                  ) : null}

                  <div className="pt-1">
                    <TactileButton
                      type="submit"
                      variant="primary"
                      size="lg"
                      soundEnabled={soundEnabled}
                    >
                      <Send className="h-4 w-4" aria-hidden="true" />
                      <span>Send Message</span>
                    </TactileButton>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#EBC8C3]/10 bg-[#120307]">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-xs text-[#C8A6A2]">
            <span className="font-display text-base font-semibold text-[#F7E5E2]">{profile.name}</span>
            <span aria-hidden="true"> · </span>
            <span>{profile.course}</span>
            <span aria-hidden="true"> · </span>
            <span>2026</span>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-[#C8A6A2]">
            <a href="#home" className="hover:text-[#F7E5E2] transition-colors whitespace-nowrap">
              Home
            </a>
            <a href="#about" className="hover:text-[#F7E5E2] transition-colors whitespace-nowrap">
              About
            </a>
            <a href="#skills" className="hover:text-[#F7E5E2] transition-colors whitespace-nowrap">
              Skills
            </a>
            <a href="#projects" className="hover:text-[#F7E5E2] transition-colors whitespace-nowrap">
              Projects
            </a>
            <a href="#contact" className="hover:text-[#F7E5E2] transition-colors whitespace-nowrap">
              Contact
            </a>
            <TactileButton
              as="a"
              href="#top"
              variant="secondary"
              size="sm"
              soundEnabled={soundEnabled}
              soundTone="tab"
            >
              <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Back to Top</span>
            </TactileButton>
          </div>
        </div>
      </footer>

      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
        soundEnabled={soundEnabled}
      />
    </div>
  );
}
