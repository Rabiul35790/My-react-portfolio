import { AppLayout } from "./components/layout/AppLayout";
import { SectionFrame } from "./components/layout/SectionFrame";
import { FrameReveal } from "./components/motion/FrameReveal";
import { Reveal } from "./components/motion/Reveal";
import { socialLinks } from "./config/socials";
import { portfolioContent } from "./data/portfolio";
import { useLenis } from "./hooks/useLenis";
import { sectionStagger } from "./motion/variants";
import { Badge, Button, Card, Section, SectionHeading, SectionHeadingActions } from "./components/ui";
import { MotionConfig, motion } from "framer-motion";

export default function App() {
  const { hero, about, skillGroups, projects, experience, contact, footer } = portfolioContent;
  useLenis();

  return (
    <MotionConfig reducedMotion="user">
      <AppLayout>
        <Section className="pb-20 pt-24 sm:pt-32">
          <motion.div
            className="space-y-7"
            variants={sectionStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.28 }}
          >
            <Reveal>
              <SectionHeading eyebrow={hero.role} title={hero.name} description={hero.statement} />
            </Reveal>
            <Reveal delay={0.08}>
              <SectionHeadingActions>
                <Button href="#projects">{hero.ctaPrimary}</Button>
                <Button href="#contact" variant="ghost">
                  {hero.ctaSecondary}
                </Button>
              </SectionHeadingActions>
            </Reveal>
            <Reveal delay={0.14}>
              <div className="flex flex-wrap gap-2">
                {projects[0]?.stack.map((item) => (
                  <Badge key={item} tone={item === "React" ? "accent" : "default"}>
                    {item}
                  </Badge>
                ))}
              </div>
            </Reveal>
          </motion.div>
        </Section>

        <Section id="about" className="py-0">
          <FrameReveal>
            <SectionFrame>
              <SectionHeading eyebrow={about.eyebrow} title={about.title} description={about.intro} />
            </SectionFrame>
          </FrameReveal>
        </Section>

        <Section id="skills" className="py-0">
          <FrameReveal>
            <SectionFrame>
              <SectionHeading
                eyebrow="Skills"
                title="Core technologies grouped for real product delivery."
                description={skillGroups.map((group) => group.title).join(" · ")}
              />
            </SectionFrame>
          </FrameReveal>
        </Section>

        <Section id="projects" className="py-0">
          <FrameReveal>
            <SectionFrame>
              <SectionHeading
                eyebrow="Projects"
                title="Featured work with a clean editorial rhythm."
                description={`${projects.length} seeded project entries are ready in the data layer.`}
              />
            </SectionFrame>
          </FrameReveal>
        </Section>

        <Section id="experience" className="py-0">
          <FrameReveal>
            <SectionFrame>
              <SectionHeading
                eyebrow="Journey"
                title="Experience milestones framed with readability first."
                description={`${experience.length} timeline items configured.`}
              />
            </SectionFrame>
          </FrameReveal>
        </Section>

        <Section id="contact" className="py-0">
          <FrameReveal>
            <SectionFrame>
              <SectionHeading eyebrow="Contact" title={contact.title} description={contact.description} />
              <Card className="mt-7 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-text-muted">Availability</p>
                  <p className="mt-2 text-sm text-text-secondary">{contact.availability}</p>
                </div>
                <div>
                  <p className="text-sm text-text-muted">Links</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    {socialLinks.map((link) => link.label).join(" · ")}
                  </p>
                </div>
              </Card>
            </SectionFrame>
          </FrameReveal>
        </Section>

        <Section className="pb-12 pt-10">
          <Reveal>
            <p className="text-center text-sm text-text-muted">{footer.note}</p>
          </Reveal>
        </Section>
      </AppLayout>
    </MotionConfig>
  );
}
