// Generates app/lib/qabalah_writeups.json
// Keyed by card name, value: { writeup: string }
// Uses standard Golden Dawn correspondences

const sephiroth = {
  1: {
    name: "Kether", meaning: "Crown",
    body: "the first emanation and Crown of the Tree of Life — the primal point of pure, undifferentiated being from which all existence flows. Beyond all attribute and description, Kether is identified with the Ain Soph Aur (Limitless Light) contracted to its root seed. Its divine name is Eheieh ('I Am'), its archangel Metatron, and its intelligence the Mystical. It is associated with the Primum Mobile, the First Whirling, and stands as the hidden source behind every subsequent Sephira."
  },
  2: {
    name: "Chokmah", meaning: "Wisdom",
    body: "the second Sephira and the primordial Father principle — the first dynamic movement of divine Will. Where Kether is the unmoving point, Chokmah is the rushing line, pure undirected creative energy pouring outward. Its divine name is Yah (the abbreviated divine name), its archangel Raziel (keeper of divine mysteries), and its intelligence the Illuminating. Chokmah is associated with the sphere of the Zodiac and with Neptune or Uranus in some attributions. It is the root of all polarity — the seed impulse that Binah will receive and shape into form."
  },
  3: {
    name: "Binah", meaning: "Understanding",
    body: "the third Sephira and the great Supernal Mother — the dark, fertile womb that receives the outpouring energy of Chokmah and gives it first form and limit. She is the 'Great Sea,' associated with Saturn, time, death, and the origin of sorrow as the cost of form. Her divine name is YHVH Elohim, her archangel Tzaphkiel, and her intelligence the Sanctifying. The Abyss lies immediately below Binah, separating the three Supernals from the rest of the Tree. To descend into Binah is to accept the constraints through which creation becomes real."
  },
  4: {
    name: "Chesed", meaning: "Mercy",
    body: "the fourth Sephira and the first sphere below the Abyss, where the abstract ideals of the Supernals crystallize into archetypal pattern. It is the Sephira of the Great Father manifest — benevolent, expansive, and law-giving in a loving rather than punitive sense. Associated with Jupiter, Chesed represents the abundance that preserves and orders creation. Its divine name is El, its archangel Tzadkiel, and its intelligence the Cohesive or Receptacular. Its symbols include the orb, sceptre, and wand — instruments of wise authority."
  },
  5: {
    name: "Geburah", meaning: "Strength",
    body: "the fifth Sephira, the sphere of divine severity, purifying destruction, and righteous judgment. Where Chesed builds and preserves, Geburah prunes and dismantles what is corrupt or overgrown — the necessary tension in the pillar of force. Associated with Mars, Geburah embodies the warrior face of divine justice. Its divine name is Elohim Gibor ('Mighty God'), its archangel Kamael, and its intelligence the Radical. Geburah is not cruelty but the scalpel of the divine surgeon — cutting what must be cut so that genuine strength can emerge."
  },
  6: {
    name: "Tiphareth", meaning: "Beauty",
    body: "the sixth Sephira and the radiant heart of the Tree of Life, standing at the intersection of all the major paths. It is the sphere of the Sun, of the sacrificed and risen god, and of the Higher Self or Holy Guardian Angel. Every major path on the Tree passes through or toward Tiphareth. Its divine name is YHVH Eloah va-Da'ath, its archangel Raphael, and its intelligence the Mediating. Tiphareth is the sphere of redemption, harmony, and integration — the great balancing point between the Supernals above and the manifest world below, and the goal of the first great initiation."
  },
  7: {
    name: "Netzach", meaning: "Victory",
    body: "the seventh Sephira, the sphere of Venus and of raw, instinctual emotion. It is the realm of nature forces, the group mind, and the undifferentiated flow of desire and creative inspiration that precedes individual thought. Its divine name is YHVH Tzabaoth ('Lord of Hosts'), its archangel Haniel, and its intelligence the Occult — the hidden driver behind art, lust, and the longing for beauty. Netzach is the most refined form the elemental and astral forces take before descending into the denser planes. It is the first sphere of the Astral Triangle, paired with Hod below Tiphareth."
  },
  8: {
    name: "Hod", meaning: "Splendour",
    body: "the eighth Sephira, the sphere of Mercury, of reason, language, magic, and the concrete analytical mind. It is the complement to Netzach's raw feeling — here the unnamed surge of emotion is given form through symbol, word, and category. Its divine name is Elohim Tzabaoth, its archangel Michael, and its intelligence the Perfect or Absolute. Ceremonial magic operates primarily from Hod, wielding the structures of language and will to reshape the subtler planes. Together with Netzach, Hod forms the lower half of the Astral Triangle below Tiphareth."
  },
  9: {
    name: "Yesod", meaning: "Foundation",
    body: "the ninth Sephira and the sphere of the Moon, the astral plane, and the great reservoir of images and etheric forms. All the forces of the higher Sephiroth collect here before crystallizing into Malkuth. Its divine name is Shaddai El Chai ('the Almighty Living God'), its archangel Gabriel, and its intelligence the Pure or Clear — like a still water that faithfully mirrors the sky above. Yesod is the sphere of the subconscious mind, sexual and lunar tides, dream, and the world of appearances that underlies physical matter. To master Yesod is to master the fluid astral substance through which all magic operates."
  },
  10: {
    name: "Malkuth", meaning: "Kingdom",
    body: "the tenth and final Sephira, the sphere of Earth and complete physical manifestation. It is the culmination of the entire Tree — the point where all spiritual energies complete their descent into matter and become tangible reality. Its divine name is Adonai Ha-Aretz ('Lord of Earth'), its archangel Sandalphon (twin of Metatron), and its intelligence the Resplendent. Qabalistic tradition teaches that Malkuth is simultaneously the lowest and most dense point on the Tree, yet also the seed from which the next cycle of ascent begins. The Kingdom contains all the higher worlds within itself, folded into matter."
  }
};

const suitData = {
  Wands: { element: "Fire", world: "Atziluth, the Archetypal World", principle: "creative will, spiritual initiative, and transformative energy" },
  Cups: { element: "Water", world: "Briah, the Creative World", principle: "emotion, intuition, relationship, and the life of feeling" },
  Swords: { element: "Air", world: "Yetzirah, the Formative World", principle: "intellect, discrimination, conflict, and the power of the mind" },
  Pentacles: { element: "Earth", world: "Assiah, the Material World", principle: "matter, the body, practical work, and the accumulation of resources" }
};

// Minor arcana numbered writeups (generated per card)
function minorWriteup(num, suit) {
  const s = sephiroth[num];
  const sd = suitData[suit];
  const sephiraDescription = num <= 3
    ? `${s.name} (${s.meaning}), one of the three Supernal Sephiroth`
    : `${s.name} (${s.meaning})`;

  return `This card is attributed to ${sephiraDescription} in ${sd.world}, expressed through the element of ${sd.element}. The suit of ${suit} governs the sphere of ${sd.principle}; in their union with ${s.name}, this ${sd.element} quality takes the specific coloring described below.\n\n${s.name} is ${s.body}\n\nIn practical Qabalistic meditation, this card serves as a gateway to the ${s.name} current as experienced through the ${sd.element} element — the quality of ${sd.principle} as it exists at the level of ${s.name}.`;
}

// Court card writeups
const courtData = {
  "King of Wands": {
    element: "Fire of Fire", sephira: "Chokmah in Atziluth",
    decan: "20° Scorpio to 20° Sagittarius",
    body: "The King of Wands (Knight in the Golden Dawn's own deck) is Fire of Fire — the most intense and concentrated expression of Wands energy, attributed to Chokmah in Atziluth, the Archetypal World. As Fire of Fire, he embodies Chokmah's raw, outrushing creative will expressed through the Atziluthic world of pure archetype. The Chokmah current here is dynamic male force: fiery vision, sweeping command, the energy of the divine Father in his most active expression. His zodiacal range spans 20° Scorpio to 20° Sagittarius — the transition from deep Scorpionic intensity to Sagittarian expansiveness, lending him both penetrating will and far-ranging aspiration. In Qabalistic work he represents the initiating spark of creation, the unconditioned burst of divine creativity before it is shaped by any receiving principle."
  },
  "Queen of Wands": {
    element: "Water of Fire", sephira: "Binah in Atziluth",
    decan: "20° Pisces to 20° Aries",
    body: "The Queen of Wands is Water of Fire — the receptive, sustaining, and formative principle operating within the fiery Atziluthic world. She is attributed to Binah in Atziluth, bringing the quality of the Great Mother to the world of creative will and pure archetype. Where the King provides igniting force, she provides the deep, magnetic power that draws creative fire into form and holds it there. Her zodiacal range spans 20° Pisces to 20° Aries — the dissolving completion of the Piscean cycle meeting the explosive initiating force of Aries. In Qabalistic terms she represents the Supernal Mother expressing herself through Fire: the fierce, self-sustaining nurturance that is the hidden power behind every flame."
  },
  "Prince of Wands": {
    element: "Air of Fire", sephira: "Tiphareth in Atziluth",
    decan: "20° Cancer to 20° Leo",
    body: "The Prince of Wands is Air of Fire — the intellectual, communicative, and mediating aspect of the Wands current, attributed to Tiphareth in Atziluth. He brings the synthesizing, solar clarity of Tiphareth to the world of archetypal fire: keen vision, swift application, the ability to articulate and direct spiritual will. His zodiacal range spans 20° Cancer to 20° Leo, blending Cancerian sensitivity and depth with Leo's radiant self-expression and authority. In Qabalistic terms he embodies the Higher Self or Holy Guardian Angel as it expresses itself through will and action — the solar centre mediating between the fiery supernal impulse above and its earthly execution below."
  },
  "Princess of Wands": {
    element: "Earth of Fire", sephira: "Malkuth in Atziluth",
    decan: "Throne of the Ace of Wands",
    body: "The Princess of Wands is Earth of Fire — the material crystallization of the Wands current, attributed to Malkuth in Atziluth. She is the Throne of the Ace of Wands, the vessel through which the primal fire seed actualizes in form. Unlike the other three court figures who move through time and zodiacal degrees, the Princesses rule over specific regions of the Earth in traditional Golden Dawn geography. She is the most concentrated and tangible expression of Atziluthic will: vivid, immediate, and physical. In Qabalistic work she represents the point where archetypal fire completes its descent and becomes available as living creative force on the material plane."
  },
  "King of Cups": {
    element: "Fire of Water", sephira: "Chokmah in Briah",
    decan: "20° Aquarius to 20° Pisces",
    body: "The King of Cups is Fire of Water — the initiating, dynamic aspect of the Cups current, attributed to Chokmah in Briah, the Creative World. He brings the fiery forward-moving force of Chokmah to the watery, feeling world — a depth of emotional intelligence guided by broad intuitive vision rather than sentiment. His zodiacal range spans 20° Aquarius to 20° Pisces, lending him both the detached visionary quality of Aquarius and the oceanic, all-encompassing empathy of Pisces. In Qabalistic terms he embodies Wisdom as it moves through the realm of emotion and relationship — the depth intuition that can plunge into feeling and return with truth."
  },
  "Queen of Cups": {
    element: "Water of Water", sephira: "Binah in Briah",
    decan: "20° Gemini to 20° Cancer",
    body: "The Queen of Cups is Water of Water — the pure, undiluted expression of the Cups element, attributed to Binah in Briah. She is the Great Mother manifesting in the Creative World of water and emotion: profound, still, mirror-like, and deeply receptive. Her zodiacal range spans 20° Gemini to 20° Cancer, from the airy, dualistic perception of Gemini into the deep lunar nurturing of Cancer. In Qabalistic terms she is the most purely watery of all the court figures — the Supernal Understanding made entirely of feeling. Meditation on her reveals the way in which understanding itself is fundamentally a water process: the mind growing still enough to receive and hold the impress of what is."
  },
  "Prince of Cups": {
    element: "Air of Water", sephira: "Tiphareth in Briah",
    decan: "20° Libra to 20° Scorpio",
    body: "The Prince of Cups is Air of Water — the intellect and mediating consciousness brought to the emotional plane, attributed to Tiphareth in Briah. He represents the Higher Self or solar centre as it operates through feeling and imagination. His zodiacal range spans 20° Libra to 20° Scorpio: Libra's balance and aesthetic sensitivity giving way to Scorpio's penetrating emotional depth and capacity for transformation. In Qabalistic terms he embodies the possibility of a clear, witnessing consciousness within the stream of emotion — neither suppressing feeling nor being drowned by it, but using Tiphareth's mediating clarity to make the waters of Briah transparent."
  },
  "Princess of Cups": {
    element: "Earth of Water", sephira: "Malkuth in Briah",
    decan: "Throne of the Ace of Cups",
    body: "The Princess of Cups is Earth of Water — the material crystallization of the Cups current, attributed to Malkuth in Briah. She is the Throne of the Ace of Cups: the vessel in which the primordial creative waters find physical form. She embodies the most grounded and tangible expression of emotional life — feeling become flesh, intuition manifesting as image, dream, or physical sensation. In Qabalistic work she represents the point where the Creative World of Briah completes its descent and becomes accessible to the senses. Her work is to hold the sacred vessel faithfully, keeping the emotional waters pure so that the Aces above can pour through her without distortion."
  },
  "King of Swords": {
    element: "Fire of Air", sephira: "Chokmah in Yetzirah",
    decan: "20° Capricorn to 20° Aquarius",
    body: "The King of Swords is Fire of Air — the initiating, decisive aspect of the Swords current, attributed to Chokmah in Yetzirah, the Formative World. He brings the forward-driving will of Chokmah to the realm of intellect and mental discrimination. His zodiacal range spans 20° Capricorn to 20° Aquarius — from Capricorn's strategic, executive authority to Aquarius's principled idealism — lending him both precision and vision. In Qabalistic terms he is Wisdom applied to the life of mind: the swift sword of analysis backed by the full creative impetus of the divine masculine. His intelligence cuts through confusion with genuine authority because it is anchored in the primordial clarity of Chokmah."
  },
  "Queen of Swords": {
    element: "Water of Air", sephira: "Binah in Yetzirah",
    decan: "20° Virgo to 20° Libra",
    body: "The Queen of Swords is Water of Air — the receptive, formative, and deeply perceptive aspect of the Swords element, attributed to Binah in Yetzirah. She brings the Supernal Mother's quality of clear-eyed Understanding to the world of intellect and thought. Her zodiacal range spans 20° Virgo to 20° Libra: from Virgo's discriminating, analytical precision to Libra's capacity for balanced judgment. In Qabalistic terms she represents Understanding as it operates through the life of mind — the ability to hold complex information in stillness, to let patterns emerge, and to perceive what others miss. Her famous sharpness is the clarity of Binah: she has seen too much to be deceived."
  },
  "Prince of Swords": {
    element: "Air of Air", sephira: "Tiphareth in Yetzirah",
    decan: "20° Taurus to 20° Gemini",
    body: "The Prince of Swords is Air of Air — the purest expression of the Swords element, attributed to Tiphareth in Yetzirah. He embodies the fully mobile, swift, and many-faceted quality of mental life, guided by the harmonizing centre of Tiphareth. His zodiacal range spans 20° Taurus to 20° Gemini: from the stubborn, stabilizing ground of Taurus to the lightning-quick duality of Gemini. In Qabalistic terms he represents the Higher Self or solar mediator working entirely through the medium of mind — the possibility of consciousness that is pure, spacious, and swift, equally capable of structure and flight. He is both the ideal and the hazard of the intellect: vast and rapid, but easily untethered from root and feeling."
  },
  "Princess of Swords": {
    element: "Earth of Air", sephira: "Malkuth in Yetzirah",
    decan: "Throne of the Ace of Swords",
    body: "The Princess of Swords is Earth of Air — the material crystallization of the Swords current, attributed to Malkuth in Yetzirah. She is the Throne of the Ace of Swords, the vessel through which the primordial power of mind actualizes as specific thought, perception, and speech. She represents the most concrete and immediately actionable level of mental energy: thought made form, idea become word or deed. In Qabalistic terms she embodies the point where the Formative World's great patterns of mind descend into the kingdom of material reality — where the sword of intellect meets the ground. Her particular gift and challenge is making abstract truth tangibly real."
  },
  "King of Pentacles": {
    element: "Fire of Earth", sephira: "Chokmah in Assiah",
    decan: "20° Aries to 20° Taurus",
    body: "The King of Pentacles is Fire of Earth — the initiating and activating principle within the Pentacles current, attributed to Chokmah in Assiah, the Material World. He brings the forward-driving wisdom of Chokmah to the sphere of matter, body, work, and wealth. His zodiacal range spans 20° Aries to 20° Taurus: from Aries's bold initiating energy to Taurus's patient, value-anchored endurance. In Qabalistic terms he is the primordial creative Will expressing itself through the material plane — the divine impulse made productive flesh. He represents not mere accumulation but the wisdom to know what is genuinely worth building, and the will to build it with full commitment."
  },
  "Queen of Pentacles": {
    element: "Water of Earth", sephira: "Binah in Assiah",
    decan: "20° Sagittarius to 20° Capricorn",
    body: "The Queen of Pentacles is Water of Earth — the receptive, formative, and sustaining principle within the Pentacles current, attributed to Binah in Assiah. She brings the Supernal Mother's quality of deep understanding to the manifest material world. Her zodiacal range spans 20° Sagittarius to 20° Capricorn: from Sagittarius's expansive, philosophically enriched abundance to Capricorn's disciplined, long-term mastery of material form. In Qabalistic terms she represents Understanding in its earthiest mode — the wisdom of the body, the land, and the long cycle. She understands that the material world is not separate from the sacred, and that caring for physical life is itself a form of spiritual practice."
  },
  "Prince of Pentacles": {
    element: "Air of Earth", sephira: "Tiphareth in Assiah",
    decan: "20° Leo to 20° Virgo",
    body: "The Prince of Pentacles is Air of Earth — the mediating, analytical, and methodical aspect of the Pentacles element, attributed to Tiphareth in Assiah. He brings the solar, harmonizing clarity of Tiphareth to the material world of work and resources. His zodiacal range spans 20° Leo to 20° Virgo: from Leo's confident, warm self-expression to Virgo's meticulous, perfection-seeking analysis. In Qabalistic terms he represents the Higher Self operating through the disciplined understanding of material reality — the mind that can see both the whole pattern and the finest detail, and patiently work the two into harmony. He is the master craftsman of the Pentacles court."
  },
  "Princess of Pentacles": {
    element: "Earth of Earth", sephira: "Malkuth in Assiah",
    decan: "Throne of the Ace of Pentacles",
    body: "The Princess of Pentacles is Earth of Earth — the most purely material expression in the entire court, attributed to Malkuth in Assiah. She is the Throne of the Ace of Pentacles, the vessel in which the primal earth seed fully actualizes as physical life. In the Golden Dawn schema she is the densest point of the entire Sephirotic system: Malkuth squared, matter expressing its deepest nature. Yet in Qabalistic understanding this is not a low station — Malkuth is the culmination of the entire Tree, and the Princess of Pentacles is its most faithful guardian. She holds the physical world with reverence, understanding that the Kingdom is also the Sanctuary."
  }
};

// Major arcana
const majorArcana = {
  "The Fool": {
    path: 11, letter: "Aleph (א)", letterMeaning: "Ox", element: "Air",
    connects: "Kether to Chokmah",
    intelligence: "Scintillating Intelligence",
    body: "The Fool is attributed to Path 11 on the Tree of Life, the first and most exalted of the 22 paths, connecting Kether (the Crown) to Chokmah (Wisdom). Its Hebrew letter is Aleph (א), one of the three Mother Letters, meaning 'Ox' — the primal, plowing force that breaks the ground of existence. The element is Air: the Ruach, the breath of life, the spirit that moves between all opposites without being caught by either. The intelligence of this path is Scintillating — a sparkling, dancing quality of awareness that precedes and transcends all fixed categories. As the path between the two highest Supernal Sephiroth, the Fool's domain is the realm before creation has committed to any particular form. He is not naïve but pre-cognitive: the divine consciousness that leaps into manifestation without the weight of prior experience, because this consciousness IS the source of all experience."
  },
  "The Magician": {
    path: 12, letter: "Beth (ב)", letterMeaning: "House",  planet: "Mercury",
    connects: "Kether to Binah",
    intelligence: "Transparent Intelligence",
    body: "The Magician is attributed to Path 12 on the Tree of Life, connecting Kether (the Crown) to Binah (Understanding) — the path of the Word being given to the Mother. Its Hebrew letter is Beth (ב), the first letter of the Torah (Bereshit, 'In the beginning'), meaning 'House' — the container, the tool, the first act of organization. Its planetary attribution is Mercury: communication, intelligence, the capacity to mediate between worlds. The intelligence of this path is Transparent — it transmits the pure light of Kether to the formative intelligence of Binah without distortion. The Magician stands at the moment divine will becomes directed intention: the supreme 'as above, so below' axis where Kether's infinite possibility is channeled, through perfect clarity and skill, into the first act of creation."
  },
  "The High Priestess": {
    path: 13, letter: "Gimel (ג)", letterMeaning: "Camel", planet: "Moon",
    connects: "Kether to Tiphareth",
    intelligence: "Uniting Intelligence",
    body: "The High Priestess is attributed to Path 13 on the Tree of Life, the longest and most mysterious of all paths, connecting Kether (the Crown) directly to Tiphareth (Beauty) — a path that cuts through the Abyss. Its Hebrew letter is Gimel (ג), meaning 'Camel' — the animal that crosses the desert between two worlds, carrying hidden water as sustenance. Its planetary attribution is the Moon: reflection, mystery, the threshold between visible and invisible. The intelligence of this path is Uniting. The High Priestess is the veil between the worlds: the lunar mediator who carries the light of Kether downward to the solar centre of Tiphareth, and who leads the adept back upward through the same hidden path. She is the Shekinah, the divine presence, the secret doctrine."
  },
  "The Empress": {
    path: 14, letter: "Daleth (ד)", letterMeaning: "Door", planet: "Venus",
    connects: "Chokmah to Binah",
    intelligence: "Luminous Intelligence",
    body: "The Empress is attributed to Path 14 on the Tree of Life, connecting Chokmah (Wisdom) to Binah (Understanding) — the horizontal path linking the two great supernal pillars, Father and Mother. Its Hebrew letter is Daleth (ד), meaning 'Door' — the threshold through which the creative impulse passes from the father principle into the mother principle. Its planetary attribution is Venus: love, beauty, fertile abundance, and the magnetism that draws all things into relationship. The intelligence of this path is Luminous. The Empress is the marriage of the two Supernal parents: the point at which pure creative will meets the great receptive understanding, and from their union all the lower Sephiroth and all manifest life are born. She is Nature herself, the living world, the generative matrix of all form."
  },
  "The Emperor": {
    path: 15, letter: "Heh (ה)", letterMeaning: "Window", sign: "Aries",
    connects: "Chokmah to Tiphareth",
    intelligence: "Constituting Intelligence",
    body: "The Emperor is attributed to Path 15 on the Tree of Life, connecting Chokmah (Wisdom) to Tiphareth (Beauty) down the Pillar of Mercy. Its Hebrew letter is Heh (ה), meaning 'Window' — the aperture through which divine light is directed and focused. Its astrological attribution is Aries, the first sign, the cardinal fire that initiates all action and establishes sovereign will. The intelligence of this path is Constituting — it lays the founding structure through which creative wisdom can become ordered reality. The Emperor represents the archetype of divine law and ordered power: not arbitrary authority, but the capacity of Chokmah's wisdom to project itself through Tiphareth's mediating centre as a principle of coherent structure. He is the architectural intelligence underlying all manifest form."
  },
  "The Hierophant": {
    path: 16, letter: "Vav (ו)", letterMeaning: "Nail/Hook", sign: "Taurus",
    connects: "Chokmah to Chesed",
    intelligence: "Triumphal or Eternal Intelligence",
    body: "The Hierophant is attributed to Path 16 on the Tree of Life, connecting Chokmah (Wisdom) to Chesed (Mercy) along the upper portion of the Pillar of Mercy. Its Hebrew letter is Vav (ו), meaning 'Nail' or 'Hook' — the connecting pin that joins heaven to earth, holding the structure of the divine covenant together. Its astrological attribution is Taurus: the fixed earth sign associated with embodied value, tradition, and the slow accumulation of enduring forms. The intelligence of this path is Triumphal or Eternal. The Hierophant represents the transmission of spiritual wisdom through established forms — the role of tradition, teaching, and initiation in carrying divine knowledge across time. He is Chokmah's wisdom made teachable: the outer form of an inner grace."
  },
  "The Lovers": {
    path: 17, letter: "Zayin (ז)", letterMeaning: "Sword", sign: "Gemini",
    connects: "Binah to Tiphareth",
    intelligence: "Disposing Intelligence",
    body: "The Lovers is attributed to Path 17 on the Tree of Life, connecting Binah (Understanding) to Tiphareth (Beauty) — the path by which the Great Mother's formative intelligence descends toward the solar centre of harmony. Its Hebrew letter is Zayin (ז), meaning 'Sword' — the blade of discrimination, the tool of discernment that cuts through appearances to the essential. Its astrological attribution is Gemini: the mutable air sign of duality, communication, and the power to hold opposites in relationship. The intelligence of this path is Disposing — it arranges the elements of creation into purposeful relationship. The Lovers is not merely romantic union but the faculty of conscious choice and genuine discernment: the marriage of opposites within the psyche, the recognition of the divine in the other, and the courage to commit to what one truly values."
  },
  "The Chariot": {
    path: 18, letter: "Cheth (ח)", letterMeaning: "Fence/Field", sign: "Cancer",
    connects: "Binah to Geburah",
    intelligence: "Intelligence of the House of Influence",
    body: "The Chariot is attributed to Path 18 on the Tree of Life, connecting Binah (Understanding) to Geburah (Strength) — the path that carries the formative intelligence of the Supernal Mother down through the severity of the divine warrior. Its Hebrew letter is Cheth (ח), meaning 'Fence' or 'Enclosure' — the protected field, the container that holds the sacred. Its astrological attribution is Cancer: the cardinal water sign of home, protection, the shell, and the instinctive emotional intelligence of the mother. The intelligence of this path is the Intelligence of the House of Influence. The Chariot represents the disciplined will that harnesses opposing forces — the victory that comes not through brute force but through mastery of inner tension. It is Binah's vast understanding channeled through Geburah's executive power."
  },
  "The Hermit": {
    path: 20, letter: "Yod (י)", letterMeaning: "Hand/Fist", sign: "Virgo",
    connects: "Chesed to Tiphareth",
    intelligence: "Intelligence of Will",
    body: "The Hermit is attributed to Path 20 on the Tree of Life, connecting Chesed (Mercy) to Tiphareth (Beauty) — the path by which the archetypal abundance of Chesed is distilled and focused into the solar centre of the Higher Self. Its Hebrew letter is Yod (י), the smallest letter in the Hebrew alphabet yet the seed from which every other letter is formed, meaning 'Hand' or 'Fist' — the reaching hand, the seed impulse, the concentrated point of intention. Yod is also the first letter of the divine name YHVH. Its astrological attribution is Virgo: the mutable earth sign of analysis, discernment, service, and the meticulous refinement of what is essential from what is superfluous. The intelligence of this path is the Intelligence of Will. The Hermit represents the introversion and concentration of spiritual force: the withdrawal from the many into the One, the long patient work of separating the pure from the impure through sustained attention and practiced discrimination. His lamp is Yod — a single point of eternal light carried through the darkness of material existence."
  },
  "Justice": {
    path: 22, letter: "Lamed (ל)", letterMeaning: "Ox-Goad", sign: "Libra",
    connects: "Geburah to Tiphareth",
    intelligence: "Faithful Intelligence",
    body: "Justice is attributed to Path 22 on the Tree of Life, connecting Geburah (Strength/Severity) to Tiphareth (Beauty) — the path that brings the force of divine judgment into the harmonizing heart of the Tree. Its Hebrew letter is Lamed (ל), meaning 'Ox-Goad' — the tool that directs and corrects, the gentle but insistent pressure that keeps things on course. It is the tallest letter in the Hebrew alphabet, reaching upward. Its astrological attribution is Libra: the cardinal air sign of balance, law, and the weighing of opposites. The intelligence of this path is Faithful — it reflects the absolute impartiality of divine law. Justice on this path represents the adjustment that occurs at the level of Geburah's truth meeting Tiphareth's beauty: not cold punishment but the living equilibrium of a cosmos in which every action is perfectly weighted and perfectly returned."
  },
  "Temperance": {
    path: 25, letter: "Samekh (ס)", letterMeaning: "Prop/Tent-peg", sign: "Sagittarius",
    connects: "Tiphareth to Yesod",
    intelligence: "Tentative Intelligence",
    body: "Temperance is attributed to Path 25 on the Tree of Life, connecting Tiphareth (Beauty) to Yesod (Foundation) — the path of the Arrow that travels directly down the Middle Pillar from the solar heart of the Tree toward the lunar foundation of the astral world. Its Hebrew letter is Samekh (ס), meaning 'Prop' or 'Tent-peg' — the support, the stable foundation beneath a structure, the capacity to bear weight. Its astrological attribution is Sagittarius: the mutable fire sign of the archer, of philosophy, aspiration, and the targeting of higher truth. The intelligence of this path is Tentative — it is the intelligence of probation, of testing, of the long process of alchemical refinement. Temperance is the great work of integration: the continuous flowing back and forth between Tiphareth and Yesod, the solar self and the astral self, tempering the soul through repeated blending until perfect balance is achieved."
  },
  "The Moon": {
    path: 29, letter: "Qoph (ק)", letterMeaning: "Back of Head", sign: "Pisces",
    connects: "Netzach to Malkuth",
    intelligence: "Corporeal Intelligence",
    body: "The Moon is attributed to Path 29 on the Tree of Life, connecting Netzach (Victory) to Malkuth (Kingdom) — the path by which the instinctual, Venusian forces of Netzach descend into physical manifestation. Its Hebrew letter is Qoph (ק), meaning the 'Back of the Head' — the reptilian brain, the part of consciousness that predates rational thought, the deepest instinct. Its astrological attribution is Pisces: the mutable water sign of dissolution, dreams, empathy, and the merging of boundaries. The intelligence of this path is Corporeal — it is the consciousness of the body itself, of biological and cellular intelligence, of the deep night-sea that underlies waking perception. The Moon on this path is the crossing from the astral into the physical: the long, strange passage through the waters of pre-rational consciousness that precedes both birth and initiation."
  },
  "The Devil": {
    path: 26, letter: "Ayin (ע)", letterMeaning: "Eye", sign: "Capricorn",
    connects: "Tiphareth to Hod",
    intelligence: "Renovating Intelligence",
    body: "The Devil is attributed to Path 26 on the Tree of Life, connecting Tiphareth (Beauty) to Hod (Splendour) — the path by which the solar light of the higher self descends into the mercurial sphere of the concrete intellect and the built world. Its Hebrew letter is Ayin (ע), meaning 'Eye' — the organ of direct perception, the faculty that sees the world as it physically appears. Its astrological attribution is Capricorn: the cardinal earth sign of ambition, structure, material mastery, and the slow ascent of worldly power. The intelligence of this path is Renovating. Despite its ominous imagery in most decks, the Devil on this path represents the binding and renovating force of material existence: the descent of spiritual light into the density of matter that makes genuine transformation possible. The chains are voluntary; the horns conceal a crown."
  }
};

// Build the output JSON
const output = {};

// Major arcana
for (const [name, data] of Object.entries(majorArcana)) {
  const parts = [`Path ${data.path} — ${data.letter} (${data.letterMeaning})`];
  if (data.element) parts.push(`Element: ${data.element}`);
  if (data.planet) parts.push(`Planet: ${data.planet}`);
  if (data.sign) parts.push(`Sign: ${data.sign}`);
  parts.push(`Connects: ${data.connects}`);
  parts.push(`Intelligence: ${data.intelligence}`);
  output[name] = { writeup: data.body };
}

// Court cards
for (const [name, data] of Object.entries(courtData)) {
  output[name] = { writeup: data.body };
}

// Numbered minor arcana
const numberedCards = [
  ["Ace", 1], ["Two", 2], ["Three", 3], ["Four", 4], ["Five", 5],
  ["Six", 6], ["Seven", 7], ["Eight", 8], ["Nine", 9], ["Ten", 10]
];
for (const [word, num] of numberedCards) {
  for (const suit of ["Wands", "Cups", "Swords", "Pentacles"]) {
    const name = word === "Ace" ? `Ace of ${suit}` : `${word} of ${suit}`;
    output[name] = { writeup: minorWriteup(num, suit) };
  }
}

import { writeFileSync } from "fs";
writeFileSync(
  new URL("../app/lib/qabalah_writeups.json", import.meta.url),
  JSON.stringify(output, null, 2)
);
console.log(`Written ${Object.keys(output).length} entries.`);
