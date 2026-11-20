import {useEffect} from 'react';
import {ExternalLink, Github, X} from 'lucide-react';
import type {ProjectItem} from '../data/portfolioData';
import {ResilientImage} from './ResilientImage';
import {TactileButton} from './TactileButton';
import {playTactileClick} from '../utils/tactileAudio';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  soundEnabled: boolean;
}

export function ProjectModal({project, onClose, soundEnabled}: ProjectModalProps) {
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        playTactileClick(soundEnabled, 'tab');
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose, soundEnabled]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0D0205]/82 p-4 sm:p-6 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          playTactileClick(soundEnabled, 'tab');
          onClose();
        }
      }}
    >
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#1E070D] border border-[#EBC8C3]/20 shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 bg-[#1E070D]/95 backdrop-blur-sm border-b border-[#EBC8C3]/12 px-6 py-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-xs font-medium text-[#C8A6A2]">
              <span className="font-mono tabular-nums text-[#EBC8C3]">{project.number}</span>
              <span aria-hidden="true">·</span>
              <span className="truncate">{project.role}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums">{project.year}</span>
            </div>
            <h3
              id="project-modal-title"
              className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-[#F7E5E2] truncate"
            >
              {project.title}
            </h3>
          </div>

          <TactileButton
            variant="subtle"
            size="sm"
            soundEnabled={soundEnabled}
            soundTone="tab"
            onClick={onClose}
            aria-label="Close project preview"
          >
            <X className="h-4 w-4" aria-hidden="true" />
            <span>Close</span>
          </TactileButton>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          <div className="overflow-hidden rounded-xl border border-[#EBC8C3]/15 bg-[#090204]">
            <ResilientImage
              src={project.screenshot}
              alt={project.screenshotAlt}
              title={project.title}
              className={`w-full aspect-[4/3] ${
                project.imageFit === 'contain' ? 'object-contain' : 'object-cover object-top'
              }`}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2 space-y-4">
              <div>
                <h4 className="font-display text-xl font-semibold text-[#F7E5E2] mb-1.5">
                  Project Overview
                </h4>
                <p className="text-sm leading-relaxed text-[#C8A6A2]">
                  {project.shortDescription}
                </p>
              </div>

              <div>
                <h4 className="font-display text-xl font-semibold text-[#F7E5E2] mb-2">
                  What I Built
                </h4>
                <ul className="space-y-2 text-sm text-[#C8A6A2]">
                  {project.whatIDid.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 leading-relaxed">
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#EBC8C3]"
                        aria-hidden="true"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-5 rounded-xl bg-[#3E0D18] p-5 border border-[#EBC8C3]/15 h-fit">
              <div>
                <p className="text-xs font-medium text-[#C8A6A2] mb-1.5">Tools Used</p>
                <p className="text-sm font-medium text-[#F7E5E2] leading-relaxed">
                  {project.tools.join(' · ')}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-[#C8A6A2] mb-1.5">Design Highlight</p>
                <p className="text-xs leading-relaxed text-[#EBC8C3]/90">
                  {project.interactivePreviewNote}
                </p>
              </div>

              <div className="flex flex-col gap-2.5 pt-1">
                <TactileButton
                  as="a"
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  size="sm"
                  soundEnabled={soundEnabled}
                  className="w-full"
                >
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{project.linkLabel ?? 'Visit Live Site'}</span>
                </TactileButton>
                {project.repoUrl && project.repoUrl !== project.liveUrl ? (
                  <TactileButton
                    as="a"
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="secondary"
                    size="sm"
                    soundEnabled={soundEnabled}
                    className="w-full"
                  >
                    <Github className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>View Source Files</span>
                  </TactileButton>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
