import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Explore Skardu — Summit Fellowship 2026',
  description:
    'A field guide to Baltistan. Five thousand square kilometres of valley, glacier, fort, lake and desert — wedged between four of the world\'s fourteen eight-thousanders.',
};

export default function ExploreSkardu() {
  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroBg}></div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className={styles.breadcrumbs}>
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Explore Skardu</span>
          </div>
          <h1 className={styles.heroTitle}>
            A field guide to <em>Baltistan.</em>
          </h1>
          <p className={styles.heroSubtitle}>
            Five thousand square kilometres of valley, glacier, fort, lake and desert — wedged between four of the world&apos;s fourteen eight-thousanders. What to know, where to go, and what to eat while you&apos;re here.
          </p>
          <div className={styles.heroMeta}>
            <div className={styles.heroMetaItem}>
              <span className={styles.label}>Region</span>
              <span className={styles.value}>Baltistan Division</span>
            </div>
            <div className={styles.heroMetaItem}>
              <span className={styles.label}>8000-m peaks nearby</span>
              <span className={styles.value}>Four · incl. K2</span>
            </div>
            <div className={styles.heroMetaItem}>
              <span className={styles.label}>Buddhist heritage</span>
              <span className={styles.value}>7th century CE</span>
            </div>
            <div className={styles.heroMetaItem}>
              <span className={styles.label}>Ruling dynasty</span>
              <span className={styles.value}>Maqpon · ~700 yrs</span>
            </div>
          </div>
        </div>
      </section>

      {/* About Shigar */}
      <section className={styles.aboutShigar} id="about-shigar">
        <div className="container">
          <div className={styles.aboutShigarGrid}>
            <div className={styles.aboutShigarHead}>
              <div className={styles.eyebrowLine}>
                <span className={styles.eyebrowLineBar}></span>
                <span className={styles.eyebrow}>Section 01 · About Shigar</span>
              </div>
              <h2>
                A valley at the<br />
                <em>crossroads.</em>
              </h2>
              <p className={styles.lead}>Caravan stop. Royal seat. Apricot orchard. Architectural treasury. Quiet still.</p>
              <div className={styles.aboutShigarMeta}>
                <div className={styles.metaItem}>
                  <span className={styles.label}>Sits at</span>
                  <span className={styles.v}>Confluence of Indus &amp; Shigar rivers</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.label}>Stretches</span>
                  <span className={styles.v}>~170 km · Skardu → Askole</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.label}>Capital fort</span>
                  <span className={styles.v}>Fong Khar · Palace on the Rock</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.label}>Ruled by</span>
                  <span className={styles.v}>Amacha dynasty · 33 generations</span>
                </div>
              </div>
            </div>
            <div className={styles.aboutShigarBody}>
              <p className={styles.dropcap}>
                Situated in the heart of the Karakoram, the Shigar valley — and Baltistan more broadly — has spent the last fifteen centuries as a quiet but consequential <strong>cultural crossroads</strong>, connecting the inner mountain world to Central Asia, Ladakh, Kashmir and the wider Tibetan plateau.
              </p>
              <p>
                Historically linked through caravan routes that branched off the ancient Silk Road, Shigar saw the movement of <strong>traders, pilgrims, scholars, craftsmen and explorers</strong> across some of the highest mountain corridors on Earth. Those exchanges left behind a layered inheritance — Tibetan structural language, Persian decorative detail, Central Asian craft, South Asian motif — visible today in the valley&apos;s forts, mosques, irrigation channels and the cadence of everyday speech.
              </p>
              <p>
                Shigar is also deeply rooted in <strong>Balti heritage</strong>. Language, oral storytelling, polo, music and communal traditions have been preserved across generations within the valley&apos;s closely connected settlements. Surrounded by towering peaks and a long history of relative isolation, Shigar&apos;s communities developed a distinct identity shaped by both the harsh mountain environment and centuries of intercultural exchange.
              </p>
              <p>
                At the centre of all this sits the <strong>17th-century Fong Khar</strong> — Palace on the Rock — built by Raja Hasan Khan, the 20th ruler of the Amacha dynasty, using craftsmen brought in from Kashmir. It was abandoned in the mid-20th century, restored by the Aga Khan Cultural Service over five years, and now operates as a heritage hotel and museum. It is a 15-minute drive from Khoj — and one of the sites the cohort will visit during the week.
              </p>
            </div>
            <div className={styles.aboutShigarMedia}>
              <figure className={styles.fig1}>
                <div className={styles.imageWrapper}>
                  <Image
                    src="/images/skardu/explore-skardu/shigar-valley.jpg"
                    alt="Shigar valley · looking north"
                    fill
                    className={styles.aboutShigarImage}
                  />
                </div>
                <figcaption>
                  <span className={styles.n}>01</span>Shigar valley · looking north
                </figcaption>
              </figure>
              <figure className={styles.fig2}>
                <div className={styles.imageWrapper}>
                  <Image
                    src="/images/skardu/explore-skardu/Fond-Khar.jpg"
                    alt="Fong Khar"
                    fill
                    className={styles.aboutShigarImage}
                  />
                </div>
                <figcaption>
                  <span className={styles.n}>02</span>Fong Khar
                </figcaption>
              </figure>
              <figure className={styles.fig3}>
                <div className={styles.imageWrapper}>
                  <Image
                    src="/images/skardu/explore-skardu/apricot-orchar-Shigar.jpg"
                    alt="Apricot orchards"
                    fill
                    className={styles.aboutShigarImage}
                  />
                </div>
                <figcaption>
                  <span className={styles.n}>03</span>Apricot orchards
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* Key Facts */}
      <section className={styles.keyFacts} id="key-facts">
        <div className={styles.topoBg}></div>
        <div className="container">
          <div className={styles.keyFactsHead}>
            <div>
              <div className={`${styles.eyebrow} ${styles.eyebrowDark}`} style={{ marginBottom: '16px' }}>
                Section 03 · Key facts about Skardu
              </div>
              <h2 style={{ color: 'var(--paper)', fontSize: 'clamp(40px, 5.2vw, 80px)' }}>
                The numbers that<br />
                make this place <em>unreasonable.</em>
              </h2>
            </div>
            <p className={styles.desc}>
              Skardu is geographically strange. It&apos;s a wide, flat-floored valley sitting at 2,500 m, walled in by mountains five times that high, with deserts, lakes and apricot orchards all within an hour&apos;s drive. These are the data points that explain it.
            </p>
          </div>

          <div className={styles.factGrid}>
            {/* Fact cards */}
            <article className={`${styles.fact} ${styles.factSpan4}`}>
              <div className={styles.factNum}>No. 01 · Mountaineering</div>
              <div className={styles.factStat}>
                4<span className={styles.unit}>/14</span>
                <span className={styles.small}>eight-thousanders</span>
              </div>
              <div className={styles.factBody}>
                Of the fourteen 8,000-metre peaks on Earth, four sit in Skardu District: <strong>K2 (8,611 m)</strong>, Gasherbrum I (8,080 m), Broad Peak (8,051 m) and Gasherbrum II. K2 is the highest in Pakistan and second-highest in the world.
              </div>
              <div className={styles.factLabel}>K2 · Chogori · King of mountains</div>
            </article>

            <article className={`${styles.fact} ${styles.factSpan4} ${styles.factPhoto}`}>
              <div className={styles.imagePlaceholder} style={{ width: '100%', height: '100%' }}>
                <span>K2 / Karakoram peaks</span>
              </div>
              <div className={styles.factOverlay}></div>
              <div className={styles.factInner}>
                <div className={styles.factNum}>No. 02 · Etymology</div>
                <div className={styles.factStat} style={{ fontSize: 'clamp(32px, 3.6vw, 56px)' }}>
                  "Low land between two high places."
                </div>
                <div className={styles.factBody} style={{ opacity: 0.95 }}>
                  The name <em>Skardu</em> comes from Balti — the low ground between Shigar (north) and Satpara Lake (south).
                </div>
              </div>
            </article>

            <article className={`${styles.fact} ${styles.factSpan4}`}>
              <div className={styles.factNum}>No. 03 · Deosai Plateau</div>
              <div className={styles.factStat}>
                4,114<span className={styles.unit}>m</span>
              </div>
              <div className={styles.factBody}>
                The Deosai National Park, just south of Skardu, is the <strong>second-highest alpine plateau on Earth</strong>. Locals call it the Land of Giants. It is closed half the year by snow, and home to the Himalayan brown bear, snow leopard, golden marmot and ibex.
              </div>
              <div className={styles.factLabel}>"Land of giants"</div>
            </article>

            <article className={`${styles.fact} ${styles.factSpan4}`}>
              <div className={styles.factNum}>No. 05 · Geographic oddity</div>
              <div className={styles.factStat}>
                2,300<span className={styles.unit}>m</span>
              </div>
              <div className={styles.factBody}>
                Skardu hosts the <strong>highest cold desert in the world</strong> — Sarfaranga, in the Shigar valley. White sand dunes at over 2,300 m altitude, with the Indus on one side and snow-capped Karakoram peaks as a backdrop.
              </div>
              <div className={styles.factLabel}>Sarfaranga · White desert</div>
            </article>

            <article className={`${styles.fact} ${styles.factSpan4}`}>
              <div className={styles.factNum}>No. 06 · Ice</div>
              <div className={styles.factStat}>
                63<span className={styles.unit}>km</span> + 67<span className={styles.unit}>km</span>
              </div>
              <div className={styles.factBody}>
                Upstream from Skardu sit two of the longest glaciers outside the polar regions — the <strong>Baltoro</strong> (63 km) and the <strong>Biafo</strong> (67 km, connecting to the Hispar via Snow Lake). The whole district contains more glaciated terrain than any region of comparable size on Earth.
              </div>
              <div className={styles.factLabel}>Baltoro + Biafo glaciers</div>
            </article>

            <article className={`${styles.fact} ${styles.factSpan4}`}>
              <div className={styles.factNum}>No. 07 · Pre-Islamic heritage</div>
              <div className={styles.factStat}>
                8<span className={styles.unit}>th c.</span>
                <span className={styles.small}>Tibetan Buddhism</span>
              </div>
              <div className={styles.factBody}>
                Long before Islam reached the valley, Skardu was part of the Tibetan Empire&apos;s cultural sphere. A <strong>three-metre Buddha</strong> surrounded by bodhisattvas is still carved into a granite boulder at Manthal, 3 km from Skardu — dated to the 8th century CE. Tibetan inscriptions are scattered across Baltistan.
              </div>
              <div className={styles.factLabel}>Manthal Buddha Rock</div>
            </article>

          </div>
        </div>
      </section>

      {/* Things to do - simplified for MVP */}
      <section className={styles.thingsSection} id="things-to-do">
        <div className="container">
          <div className={styles.thingsHead}>
            <div>
              <div className={styles.eyebrowLine}>
                <span className={styles.eyebrowLineBar}></span>
                <span className={styles.eyebrow}>Section 04 · Things to do in Skardu</span>
              </div>
              <h2>
                What to <em>do</em>
                <br />
                when you&apos;re not
                <br />
                in session.
              </h2>
            </div>
          </div>

          {/* Lakes & water activity */}
          <div className={styles.activity}>
            <div className={styles.activityIntro}>
              <div className={styles.activityNum}>No. 01 · Lakes &amp; water</div>
              <h3 className={styles.activityTitle}>
                Glacier-fed water,<br />
                <em>everywhere.</em>
              </h3>
              <p className={styles.activityDesc}>Skardu is built around lakes — most of them spring or glacier fed. Boating, trout fishing, hiking trails, photography. Four are within an hour of Khoj.</p>
              <div className={styles.activityTag}>Best: dawn light</div>
            </div>
            <div className={styles.activityItems}>
              <SpotCard
                name="Upper Kachura Lake"
                local='Foroq Tso · "the high lake"'
                description="Crystal-clear, glacier-fed alpine lake — ~70 m deep, ringed by forested mountains. Walking trails, rustic wooden boats, brown trout."
                meta={[
                  { label: 'From Khoj', value: '~1 hr' },
                  { label: 'Elevation', value: '~2,500 m' },
                  { label: 'Depth', value: '~70 m' },
                  { label: 'Best for', value: 'Solitude' },
                ]}
                image="/images/skardu/explore-skardu/upper-kachura-lake.jpeg"
              />
              <SpotCard
                name="Lower Kachura · Shangrila"
                local='"Heaven on Earth"'
                description="Heart-shaped lake fringed by the famous Shangrila Resort — red-roofed cottages, manicured gardens. Touristy but genuinely beautiful."
                meta={[
                  { label: 'From Khoj', value: '~1 hr' },
                  { label: 'Elevation', value: '~2,300 m' },
                  { label: 'Founded', value: '1983' },
                  { label: 'Best for', value: 'Lunch stop' },
                ]}
                image="/images/skardu/explore-skardu/Shangrila-lake.jpg"
              />
              <SpotCard
                name="Satpara Lake"
                local="Sadpara Tso"
                description="Greenish-blue glacial lake 8 km south of Skardu. A small desert island sits in the middle; local lore claims a gold mine at the bottom."
                meta={[
                  { label: 'From Khoj', value: '~1 hr 15' },
                  { label: 'Elevation', value: '2,636 m' },
                  { label: 'Fish', value: 'Trout' },
                  { label: 'Best for', value: 'Photography' },
                ]}
                image="/images/skardu/explore-skardu/Satpara-Lake.jpg"
              />
              <SpotCard
                name="Sheosar Lake"
                local='"The blind lake"'
                description="High on the Deosai plateau at 4,142 m — one of the highest lakes on the planet. Wildflowers in summer; reflects Nanga Parbat on clear days."
                meta={[
                  { label: 'From Khoj', value: '3–4 hrs' },
                  { label: 'Elevation', value: '4,142 m' },
                  { label: 'Access', value: 'Jun–Oct only' },
                  { label: 'Best for', value: 'A whole day' },
                ]}
                image="/images/skardu/explore-skardu/Sheosar-lake.jpg"
              />
            </div>
          </div>

          {/* Historic sites activity */}
          <div className={styles.activity}>
            <div className={styles.activityIntro}>
              <div className={styles.activityNum}>No. 02 · Historic &amp; heritage sites</div>
              <h3 className={styles.activityTitle}>
                Forts, mosques,<br />
                and a <em>Buddha.</em>
              </h3>
              <p className={styles.activityDesc}>Skardu&apos;s heritage is layered — Tibetan Buddhist, Balti royal, Kashmiri craft. Most sites are within 45 minutes of Khoj.</p>
              <div className={styles.activityTag}>Cover shoulders &amp; knees</div>
            </div>
            <div className={styles.activityItems}>
              <SpotCard
                name="Shigar Fort · Fong Khar"
                local='"Palace on the Rock"'
                description="Built in early 1600s by Raja Hasan Khan. Construction used Kashmiri craftsmen, with Baltistani, Tibetan, and Mughal influences. Now a 20-room Serena heritage hotel and museum."
                meta={[
                  { label: 'From Khoj', value: '~15 min' },
                  { label: 'Built', value: 'Early 1600s' },
                  { label: 'Restored', value: '2004' },
                  { label: 'Status', value: 'Museum + hotel' },
                ]}
                image="/images/skardu/explore-skardu/Fond-Khar.jpg"
              />
              <SpotCard
                name="Amburiq Mosque"
                local="14th century · Shigar"
                description="One of the oldest mosques in Baltistan — remarkable Tibetan–Islamic architectural fusion. Built by Iranian craftsmen. Buddhist and Sufi motifs side by side."
                meta={[
                  { label: 'From Shigar Fort', value: '~10 min' },
                  { label: 'Built', value: '14th century' },
                  { label: 'Style', value: 'Tibetan–Islamic' },
                  { label: 'Best for', value: 'Woodcarving' },
                ]}
                image="/images/skardu/explore-skardu/Amburiq-Mosque.jpg"
              />
              <SpotCard
                name="Manthal Buddha Rock"
                local="8th century CE · pre-Islamic"
                description="A three-metre-tall Buddha surrounded by smaller bodhisattvas, carved into granite. Dated to the 8th century, when Baltistan was part of the Tibetan Empire's cultural sphere."
                meta={[
                  { label: 'From Skardu', value: '~10 min' },
                  { label: 'Carved', value: '~8th c. CE' },
                  { label: 'Subject', value: 'Buddha + bodhisattvas' },
                  { label: 'Entry', value: 'Free' },
                ]}
                image="/images/skardu/explore-skardu/Manthal-Budha-rock.jpg"
              />
              <SpotCard
                name="Kharpocho Fort"
                local='"The king of forts"'
                description="The 16th-century seat of the Maqpon dynasty. Sits on a hill above the Indus on the edge of Skardu town. Most of the structure is gone; the view is the point."
                meta={[
                  { label: 'From Skardu', value: 'In town' },
                  { label: 'Founded', value: '~1500' },
                  { label: 'Dynasty', value: 'Maqpon' },
                  { label: 'Best at', value: 'Sunset' },
                ]}
                image="/images/skardu/explore-skardu/Kharpocho-Fort.jpg"
              />
            </div>
          </div>

          {/* Hiking & trekking activity */}
          <div className={styles.activity}>
            <div className={styles.activityIntro}>
              <div className={styles.activityNum}>No. 03 · Hiking &amp; trekking</div>
              <h3 className={styles.activityTitle}>
                Trails of every<br />
                <em>scale.</em>
              </h3>
              <p className={styles.activityDesc}>From 30-minute lakeside walks to the 21-day K2 Base Camp trek. The short walks around Khoj are some of the best things you&apos;ll do all week.</p>
              <div className={styles.activityTag}>Good shoes only</div>
            </div>
            <div className={styles.activityItems}>
              <SpotCard
                name="K2 Base Camp · Concordia"
                local="Skardu → Askole → Baltoro Glacier"
                description="The most legendary trek in Pakistan. A 60-km foot journey up the Baltoro glacier to Concordia, the throne-room cirque where K2, Broad Peak, the Gasherbrums meet. Best June–September."
                meta={[
                  { label: 'Difficulty', value: 'Hard' },
                  { label: 'Best season', value: 'Jun–Sep' },
                  { label: 'Highest point', value: '~5,150 m' },
                  { label: 'For you?', value: 'Not this week' },
                ]}
                image="/images/skardu/explore-skardu/K2 Base Camp · Concordia.jpg"
              />
              <SpotCard
                name="Kharpocho Fort climb"
                local='"The king of forts"'
                description="Short, steep walk up to a 16th-century fort overlooking Skardu town and the Indus. Roughly an hour up, 40 minutes down. Panoramic city view; quietly atmospheric ruin."
                meta={[
                  { label: 'From Skardu', value: 'In town' },
                  { label: 'Round-trip', value: '~2 hrs' },
                  { label: 'Difficulty', value: 'Moderate' },
                  { label: 'Best at', value: 'Sunset' },
                ]}
                image="/images/skardu/explore-skardu/Kharpocho-Fort-climb.webp"
              />
              <SpotCard
                name="Shigar orchard walks"
                local="Khoj backyard"
                description="Twenty- to ninety-minute walks through Shigar's irrigation channels, apricot and apple orchards, and small villages. Flat-ish, gentle, surprisingly cinematic."
                meta={[
                  { label: 'From Khoj', value: 'Out the door' },
                  { label: 'Difficulty', value: 'Easy' },
                  { label: 'Length', value: '20–90 min' },
                  { label: 'Best at', value: 'Dawn / dusk' },
                ]}
                image="/images/skardu/explore-skardu/apricot-orchar-Shigar.jpg"
              />
            </div>
          </div>

          {/* Cold deserts activity */}
          <div className={styles.activity}>
            <div className={styles.activityIntro}>
              <div className={styles.activityNum}>No. 04 · Cold deserts &amp; Deosai</div>
              <h3 className={styles.activityTitle}>
                Sand dunes,<br />
                <em>at altitude.</em>
              </h3>
              <p className={styles.activityDesc}>Possibly Skardu's strangest feature: white-sand cold deserts at over 2,300 m, framed by 7,000-m peaks. The Deosai plateau adjoins them — the world's second-highest alpine plain.</p>
              <div className={styles.activityTag}>SPF 50, always</div>
            </div>
            <div className={styles.activityItems}>
              <SpotCard
                name="Katpana Cold Desert"
                local="Skardu Desert"
                description="Rolling sand dunes sitting at over 2,300 m altitude — 20 minutes from Skardu town, with the Indus on one side and the Karakoram peaks on the other. A small lake in the middle adds another layer of surrealism. Best at sunset."
                meta={[
                  { label: 'From Khoj', value: '~45 min' },
                  { label: 'Elevation', value: '~2,300 m' },
                  { label: 'Best at', value: 'Sunset' },
                  { label: 'Length of stay', value: '90 min' },
                ]}
                image="/images/skardu/explore-skardu/Katpana-cold-desert.webp"
              />
              <SpotCard
                name="Sarfaranga White Desert"
                local="World's highest cold desert"
                description="Even more dramatic than Katpana — in the Shigar valley, framed on three sides by mountains. Hosts an annual jeep rally that draws drivers from across Pakistan. Wide, flat, and almost ridiculous in scale."
                meta={[
                  { label: 'From Khoj', value: '~20 min' },
                  { label: 'Elevation', value: '~2,400 m' },
                  { label: 'Rally', value: 'April annually' },
                  { label: 'Best for', value: 'Wide angle' },
                ]}
                image="/images/skardu/explore-skardu/Sarfaranga-Cold-Desert.jpg"
              />
              <SpotCard
                name="Deosai National Park"
                local='"Land of giants"'
                description="3,000 km² of high alpine plain averaging 4,114 m. Closed by snow late October to mid-April; open six to seven months a year. Home to Himalayan brown bear, snow leopard, golden marmot, ibex. The drive across via 4×4 is one of the most surreal road trips in South Asia."
                meta={[
                  { label: 'From Khoj', value: '3–4 hrs' },
                  { label: 'Avg. elevation', value: '4,114 m' },
                  { label: 'Wildlife', value: 'Brown bear, leopard' },
                  { label: 'Open', value: 'Apr–Oct' },
                ]}
                image="/images/skardu/explore-skardu/Deosai-National-Park.jpg"
              />
            </div>
          </div>

        </div>
      </section>

      {/* Cuisine Section */}
      <section className={styles.cuisineSection} id="cuisine">
        <div className="container">
          <div className={styles.cuisineHead}>
            <div>
              <div className={styles.eyebrowLine}>
                <span className={styles.eyebrowLineBar}></span>
                <span className={styles.eyebrow}>Section 05 · Local cuisine</span>
              </div>
              <h2>
                Apricots, butter,<br />
                barley, <em>buckwheat.</em>
              </h2>
              <p className={styles.lead}>Hearty, simple, mountain food — shaped by altitude, short growing seasons, and centuries of Tibetan and Central Asian influence.</p>
            </div>
            <div>
              <p>
                Balti cuisine reflects the region&apos;s geography and history. Meals are typically <strong>simple, hearty, and built around locally-grown grains</strong> — wheat, barley, buckwheat — alongside apricots, dairy products, and seasonal vegetables.
              </p>
              <p>
                Many of the most distinctive dishes share lineage with Tibetan, Ladakhi, and Central Asian food cultures, a reminder of the caravan routes that once crossed Baltistan.
              </p>
            </div>
          </div>

          <div className={styles.cuisineHero}>
            <div className={styles.imagePlaceholder}>
              <span>Balti spread</span>
            </div>
            <figcaption>Plate 01 · A Balti table</figcaption>
          </div>

          <div className={styles.dishGrid}>
            <DishCard
              num="01"
              name="Mamtu"
              local="མོག་མོག་"
              category="Dumpling"
              description="Steamed dumplings — typically filled with minced meat, onion and spice — directly cousins to the Tibetan momo and Central Asian manti. The defining Balti dish."
              image="/images/skardu/explore-skardu/Mamtu.jpeg"
            />
            <DishCard
              num="02"
              name="Khurba"
              category="Bread"
              description="A traditional Balti flatbread — thick, slightly chewy, often baked in a tandoor and eaten warm with butter or apricot jam. Trekkers carry it."
              image="/images/skardu/explore-skardu/Khurba.jpg"
            />
            <DishCard
              num="03"
              name="Prapu"
              category="Buckwheat"
              description="A buckwheat-based dish unique to Baltistan — closer to a savoury crepe than to anything you&apos;ll find south of the mountains. Earthy and filling."
              image="/images/skardu/explore-skardu/Prapu.jpg"
            />
            <DishCard
              num="04"
              name="Chapshuro"
              category="Stuffed bread"
              description="Sometimes called &quot;Balti pizza&quot; — a flat bread stuffed with spiced minced meat, onions and herbs, then baked or pan-fried. Originally from Hunza."
              image="/images/skardu/explore-skardu/Chapshuro.jpg"
            />
            <DishCard
              num="05"
              name="Butter tea"
              local="po cha"
              category="Drink"
              description="Salted tea churned with yak butter — the Tibetan high-altitude staple. Strange on first sip, restorative by the second cup."
              image="/images/skardu/explore-skardu/Butter-Tea.jpg"
            />
            <DishCard
              num="06"
              name="Apricot, everything"
              category="Fruit · oil · soup"
              description="Baltistan&apos;s apricot crop is genuinely world-class. Fresh in June, dried and powdered for the rest of the year. Pressed for oil. Stirred into sweet-savoury soup."
              image="/images/skardu/explore-skardu/apricots.webp"
            />
          </div>
        </div>
      </section>

    </>
  );
}

function SpotCard({
  name,
  local,
  description,
  meta,
  image,
}: {
  name: string;
  local?: string;
  description: string;
  meta: Array<{ label: string; value: string }>;
  image?: string;
}) {
  return (
    <article className={styles.spot}>
      <div className={styles.spotMedia}>
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            className={styles.spotImage}
          />
        ) : (
          <div className={styles.imagePlaceholder}>
            <span>{name}</span>
          </div>
        )}
        <span className={styles.spotTag}>Location</span>
      </div>
      <div className={styles.spotBody}>
        <h4 className={styles.spotName}>{name}</h4>
        {local && <div className={styles.spotLocal}>{local}</div>}
        <p className={styles.spotDesc}>{description}</p>
        <div className={styles.spotMeta}>
          {meta.map((item, idx) => (
            <div key={idx} className={styles.spotMetaRow}>
              <span>{item.label}</span>
              <span className={styles.spotMetaValue}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

function DishCard({
  num,
  name,
  local,
  category,
  description,
  image,
}: {
  num: string;
  name: string;
  local?: string;
  category: string;
  description: string;
  image?: string;
}) {
  return (
    <article className={styles.dish}>
      <div className={styles.dishMedia}>
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            className={styles.dishImage}
          />
        ) : (
          <div className={styles.imagePlaceholder}>
            <span>{name}</span>
          </div>
        )}
        <span className={styles.dishNum}>No. {num}</span>
      </div>
      <div className={styles.dishHead}>
        <h3 className={styles.dishName}>
          {name}
          {local && <em>{local}</em>}
        </h3>
        <span className={styles.dishCat}>{category}</span>
      </div>
      <p className={styles.dishDesc}>{description}</p>
    </article>
  );
}

function ListItem({
  num,
  title,
  subtitle,
  description,
  meta,
}: {
  num: string;
  title: string;
  subtitle?: string;
  description: string;
  meta: string;
}) {
  return (
    <div className={styles.listItem}>
      <span className={styles.listItemNum}>{num}</span>
      <div>
        <h4 className={styles.listItemTitle}>
          {title}
          {subtitle && <span className={styles.listItemLocal}>{subtitle}</span>}
        </h4>
        <p className={styles.listItemDesc}>{description}</p>
      </div>
      <span className={styles.listItemMeta}>{meta}</span>
    </div>
  );
}
