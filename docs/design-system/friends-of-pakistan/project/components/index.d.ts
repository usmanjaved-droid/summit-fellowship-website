import type * as React from 'react';

type Option = string | { value: string; label?: string };
type LinkItem = string | { label: string; href?: string };

/** The site's long arrow icon. */
export interface ArrowProps { length?: 32 | 45 | 55; direction?: 'right' | 'left'; className?: string }
export declare function Arrow(props: ArrowProps): React.ReactElement;

/** Square uppercase button; renders <a> when href is set. */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'white' | 'hollow' | 'danger' | 'cancel';
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  block?: boolean;
  icon?: boolean;
  href?: string;
}
export declare function Button(props: ButtonProps): React.ReactElement;

/** Segmented control; selected segment is yellow. */
export interface ButtonGroupProps { options: Option[]; value?: string; onChange?: (value: string) => void; label?: string; className?: string }
export declare function ButtonGroup(props: ButtonGroupProps): React.ReactElement;

/** Uppercase link + long arrow. */
export interface ArrowLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> { size?: 'md' | 'lg' }
export declare function ArrowLink(props: ArrowLinkProps): React.ReactElement;

/** 200px (or 150px) yellow square call-to-action. */
export interface SquareCtaProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> { size?: 'md' | 'lg' }
export declare function SquareCta(props: SquareCtaProps): React.ReactElement;

/** 60 x 36 yellow carousel control. */
export interface CarouselButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { direction?: 'prev' | 'next'; arrowColor?: 'black' | 'white'; label?: string }
export declare function CarouselButton(props: CarouselButtonProps): React.ReactElement;

/** Uppercase status label for card images. */
export interface BadgeProps { tone?: 'primary' | 'outline'; children?: React.ReactNode; className?: string }
export declare function Badge(props: BadgeProps): React.ReactElement;

/** Stage dots on a rail; reached stages are yellow. For the green grounds. */
export interface TimelineProps { stages: string[]; current?: number; label?: string; className?: string }
export declare function Timeline(props: TimelineProps): React.ReactElement;

/** Challenge carousel card. */
export interface ChallengeCardProps {
  title: React.ReactNode;
  image?: string; imageAlt?: string;
  badge?: { label: React.ReactNode; tone?: 'primary' | 'outline' };
  category?: React.ReactNode; summary?: React.ReactNode; status?: React.ReactNode;
  stages?: string[]; current?: number;
  cta?: { label: React.ReactNode; href?: string; variant?: ButtonProps['variant'] };
  className?: string;
}
export declare function ChallengeCard(props: ChallengeCardProps): React.ReactElement;

/** Square photo tile with a yellow-ruled caption. */
export interface SolverCardProps { name: string; description?: React.ReactNode; image?: string; href?: string; className?: string }
export declare function SolverCard(props: SolverCardProps): React.ReactElement;

/** Square photo tile with an uppercase label and arrow. */
export interface ImpactTileProps { label: string; image?: string; href?: string; className?: string }
export declare function ImpactTile(props: ImpactTileProps): React.ReactElement;

/** Big serif number with an uppercase caption. */
export interface StatProps { value: React.ReactNode; label: React.ReactNode; className?: string }
export declare function Stat(props: StatProps): React.ReactElement;

/** 64px header over a green or photo hero. */
export interface SiteHeaderProps { logo?: React.ReactNode; logoHref?: string; links?: { label: string; href?: string; active?: boolean }[]; action?: { label: string; href?: string }; className?: string }
export declare function SiteHeader(props: SiteHeaderProps): React.ReactElement;

/** White drop-down panel with an image and link columns. */
export interface MegaMenuProps { columns: { title?: string; href?: string; links: LinkItem[] }[]; image?: string; className?: string }
export declare function MegaMenu(props: MegaMenuProps): React.ReactElement;

/** Deep-green footer with yellow column heads and a callout box. */
export interface SiteFooterProps {
  columns: { title: string; links: LinkItem[] }[];
  callout?: { title: string; text: React.ReactNode; href?: string; linkLabel?: string };
  logo?: React.ReactNode; legal?: React.ReactNode[]; endMark?: React.ReactNode; className?: string;
}
export declare function SiteFooter(props: SiteFooterProps): React.ReactElement;

/** Full-width off-white, white, yellow or deep-green band with a 1440px container. ('gold' = 'yellow', 'black' = 'green'.) */
export interface SectionProps { tone?: 'offwhite' | 'white' | 'yellow' | 'green' | 'gold' | 'black'; title?: React.ReactNode; intro?: React.ReactNode; tight?: boolean; children?: React.ReactNode; className?: string }
export declare function Section(props: SectionProps): React.ReactElement;

/** Rich-text typography. */
export interface ProseProps { size?: 'md' | 'sm'; children?: React.ReactNode; className?: string }
export declare function Prose(props: ProseProps): React.ReactElement;

interface FieldProps { label?: React.ReactNode; hint?: React.ReactNode; invalid?: boolean; className?: string; id?: string }
/** Green-bordered text input with label, hint and error state. */
export interface InputProps extends FieldProps, Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className' | 'id'> {}
export declare function Input(props: InputProps): React.ReactElement;
/** Green-bordered multi-line field. */
export interface TextareaProps extends FieldProps, Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'className' | 'id'> {}
export declare function Textarea(props: TextareaProps): React.ReactElement;
/** Native select with the triangle caret. */
export interface SelectProps extends FieldProps, Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'className' | 'id'> { options: Option[]; placeholder?: string }
export declare function Select(props: SelectProps): React.ReactElement;

/** 20px checkbox / radio with a 2px field border. */
export interface ChoiceProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> { label?: React.ReactNode; children?: React.ReactNode }
export declare function Checkbox(props: ChoiceProps): React.ReactElement;
export declare function Radio(props: ChoiceProps): React.ReactElement;

declare global {
  interface Window {
    FriendsOfPakistan: {
      Arrow: typeof Arrow; Button: typeof Button; ButtonGroup: typeof ButtonGroup; ArrowLink: typeof ArrowLink; SquareCta: typeof SquareCta;
      CarouselButton: typeof CarouselButton; Badge: typeof Badge; Timeline: typeof Timeline; ChallengeCard: typeof ChallengeCard;
      SolverCard: typeof SolverCard; ImpactTile: typeof ImpactTile; Stat: typeof Stat; SiteHeader: typeof SiteHeader; MegaMenu: typeof MegaMenu;
      SiteFooter: typeof SiteFooter; Section: typeof Section; Prose: typeof Prose; Input: typeof Input; Textarea: typeof Textarea;
      Select: typeof Select; Checkbox: typeof Checkbox; Radio: typeof Radio;
    };
  }
}
