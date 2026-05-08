import {
  chemicalPrinciplesTextbookChapters,
  collegeTextbookChapters,
} from './chapterChapters.js';
import { getAssetUrl } from '../utils/assetUrl';


const basicElementWords = [
  { id: 'hydrogen', term: 'Hydrogen (H)', meaning: '氢' },
  { id: 'helium', term: 'Helium (He)', meaning: '氦' },
  { id: 'lithium', term: 'Lithium (Li)', meaning: '锂' },
  { id: 'beryllium', term: 'Beryllium (Be)', meaning: '铍' },
  { id: 'boron', term: 'Boron (B)', meaning: '硼' },
  { id: 'carbon', term: 'Carbon (C)', meaning: '碳' },
  { id: 'nitrogen', term: 'Nitrogen (N)', meaning: '氮' },
  { id: 'oxygen', term: 'Oxygen (O)', meaning: '氧' },
  { id: 'fluorine', term: 'Fluorine (F)', meaning: '氟' },
  { id: 'neon', term: 'Neon (Ne)', meaning: '氖' },
  { id: 'sodium', term: 'Sodium (Na)', meaning: '钠' },
  { id: 'magnesium', term: 'Magnesium (Mg)', meaning: '镁' },
  { id: 'aluminum', term: 'Aluminum (Al)', meaning: '铝' },
  { id: 'silicon', term: 'Silicon (Si)', meaning: '硅' },
  { id: 'phosphorus', term: 'Phosphorus (P)', meaning: '磷' },
  { id: 'sulfur', term: 'Sulfur (S)', meaning: '硫' },
  { id: 'chlorine', term: 'Chlorine (Cl)', meaning: '氯' },
  { id: 'argon', term: 'Argon (Ar)', meaning: '氩' },
  { id: 'potassium', term: 'Potassium (K)', meaning: '钾' },
  { id: 'calcium', term: 'Calcium (Ca)', meaning: '钙' },
];

const extendedElementWords = [
  { id: 'chromium', term: 'Chromium (Cr)', meaning: '铬' },
  { id: 'manganese', term: 'Manganese (Mn)', meaning: '锰' },
  { id: 'iron', term: 'Iron (Fe)', meaning: '铁' },
  { id: 'nickel', term: 'Nickel (Ni)', meaning: '镍' },
  { id: 'copper', term: 'Copper (Cu)', meaning: '铜' },
  { id: 'zinc', term: 'Zinc (Zn)', meaning: '锌' },
  { id: 'bromine', term: 'Bromine (Br)', meaning: '溴' },
  { id: 'silver', term: 'Silver (Ag)', meaning: '银' },
  { id: 'tin', term: 'Tin (Sn)', meaning: '锡' },
  { id: 'iodine', term: 'Iodine (I)', meaning: '碘' },
  { id: 'barium', term: 'Barium (Ba)', meaning: '钡' },
  { id: 'platinum', term: 'Platinum (Pt)', meaning: '铂' },
  { id: 'gold', term: 'Gold (Au)', meaning: '金' },
  { id: 'mercury', term: 'Mercury (Hg)', meaning: '汞' },
];

const acidWords = [
  { id: 'acid_hydrofluoric', term: 'Hydrofluoric acid', meaning: 'HF(aq)' },
  { id: 'acid_hydrochloric', term: 'Hydrochloric acid', meaning: 'HCl(aq)' },
  { id: 'acid_hydrobromic', term: 'Hydrobromic acid', meaning: 'HBr(aq)' },
  { id: 'acid_hydroiodic', term: 'Hydroiodic acid', meaning: 'HI(aq)' },
  { id: 'acid_hydrosulfuric', term: 'Hydrosulfuric acid', meaning: 'H₂S(aq)' },
  { id: 'acid_perchloric', term: 'Perchloric acid', meaning: 'HClO₄' },
  { id: 'acid_chloric', term: 'Chloric acid', meaning: 'HClO₃' },
  { id: 'acid_chlorous', term: 'Chlorous acid', meaning: 'HClO₂' },
  { id: 'acid_hypochlorous', term: 'Hypochlorous acid', meaning: 'HClO' },
  { id: 'acid_sulfuric', term: 'Sulfuric acid', meaning: 'H₂SO₄' },
  { id: 'acid_sulfurous', term: 'Sulfurous acid', meaning: 'H₂SO₃' },
  { id: 'acid_nitric', term: 'Nitric acid', meaning: 'HNO₃' },
  { id: 'acid_nitrous', term: 'Nitrous acid', meaning: 'HNO₂' },
  { id: 'acid_phosphoric', term: 'Phosphoric acid', meaning: 'H₃PO₄' },
  { id: 'acid_phosphorous', term: 'Phosphorous acid', meaning: 'H₃PO₃' },
  { id: 'acid_carbonic', term: 'Carbonic acid', meaning: 'H₂CO₃' },
];

const baseWords = [
  { id: 'base_sodium_hydroxide', term: 'Sodium hydroxide', meaning: 'NaOH' },
  { id: 'base_potassium_hydroxide', term: 'Potassium hydroxide', meaning: 'KOH' },
  { id: 'base_calcium_hydroxide', term: 'Calcium hydroxide', meaning: 'Ca(OH)₂' },
  { id: 'base_barium_hydroxide', term: 'Barium hydroxide', meaning: 'Ba(OH)₂' },
  { id: 'base_aluminum_hydroxide', term: 'Aluminum hydroxide', meaning: 'Al(OH)₃' },
  { id: 'base_iron_iii_hydroxide', term: 'Iron(III) hydroxide', meaning: 'Fe(OH)₃' },
  { id: 'base_iron_ii_hydroxide', term: 'Iron(II) hydroxide', meaning: 'Fe(OH)₂' },
  { id: 'base_copper_ii_hydroxide', term: 'Copper(II) hydroxide', meaning: 'Cu(OH)₂' },
  { id: 'base_magnesium_hydroxide', term: 'Magnesium hydroxide', meaning: 'Mg(OH)₂' },
];

const saltWords = [
  { id: 'salt_sodium_chloride', term: 'Sodium chloride', meaning: 'NaCl' },
  { id: 'salt_potassium_iodide', term: 'Potassium iodide', meaning: 'KI' },
  { id: 'salt_lithium_fluoride', term: 'Lithium fluoride', meaning: 'LiF' },
  { id: 'salt_sodium_sulfide', term: 'Sodium sulfide', meaning: 'Na₂S' },
  { id: 'salt_sodium_perchlorate', term: 'Sodium perchlorate', meaning: 'NaClO₄' },
  { id: 'salt_sodium_chlorate', term: 'Sodium chlorate', meaning: 'NaClO₃' },
  { id: 'salt_sodium_chlorite', term: 'Sodium chlorite', meaning: 'NaClO₂' },
  { id: 'salt_sodium_hypochlorite', term: 'Sodium hypochlorite', meaning: 'NaClO' },
  { id: 'salt_potassium_sulfate', term: 'Potassium sulfate', meaning: 'K₂SO₄' },
  { id: 'salt_sodium_sulfite', term: 'Sodium sulfite', meaning: 'Na₂SO₃' },
  { id: 'salt_potassium_nitrate', term: 'Potassium nitrate', meaning: 'KNO₃' },
  { id: 'salt_sodium_nitrite', term: 'Sodium nitrite', meaning: 'NaNO₂' },
  { id: 'salt_calcium_phosphate', term: 'Calcium phosphate', meaning: 'Ca₃(PO₄)₂' },
  { id: 'salt_sodium_carbonate', term: 'Sodium carbonate', meaning: 'Na₂CO₃' },
  { id: 'salt_sodium_hydrogen_carbonate', term: 'Sodium hydrogen carbonate', meaning: 'NaHCO₃' },
  { id: 'salt_sodium_dihydrogen_phosphate', term: 'Sodium dihydrogen phosphate', meaning: 'NaH₂PO₄' },
  { id: 'salt_sodium_monohydrogen_phosphate', term: 'Sodium monohydrogen phosphate', meaning: 'Na₂HPO₄' },
  { id: 'salt_iron_iii_chloride', term: 'Iron(III) chloride', meaning: 'FeCl₃' },
  { id: 'salt_iron_ii_chloride', term: 'Iron(II) chloride', meaning: 'FeCl₂' },
  { id: 'salt_copper_ii_sulfate', term: 'Copper(II) sulfate', meaning: 'CuSO₄' },
  { id: 'salt_manganese_ii_chlorite', term: 'Manganese(II) chlorite', meaning: 'Mn(ClO₂)₂' },
  { id: 'salt_ammonium_carbonate', term: 'Ammonium carbonate', meaning: '(NH₄)₂CO₃' },
  { id: 'salt_zinc_periodate', term: 'Zinc periodate', meaning: 'Zn(IO₄)₂' },
  { id: 'salt_chromium_iii_iodide', term: 'Chromium(III) iodide', meaning: 'CrI₃' },
];

const oxyanionWords = [
  { id: 'oxyanion_nitrate', term: 'Nitrate ion', meaning: 'NO₃⁻' },
  { id: 'oxyanion_nitrite', term: 'Nitrite ion', meaning: 'NO₂⁻' },
  { id: 'oxyanion_sulfate', term: 'Sulfate ion', meaning: 'SO₄²⁻' },
  { id: 'oxyanion_sulfite', term: 'Sulfite ion', meaning: 'SO₃²⁻' },
  { id: 'oxyanion_carbonate', term: 'Carbonate ion', meaning: 'CO₃²⁻' },
  { id: 'oxyanion_hydrogen_carbonate', term: 'Hydrogen carbonate ion', meaning: 'HCO₃⁻' },
  { id: 'oxyanion_phosphate', term: 'Phosphate ion', meaning: 'PO₄³⁻' },
  { id: 'oxyanion_hydrogen_phosphate', term: 'Hydrogen phosphate ion', meaning: 'HPO₄²⁻' },
  { id: 'oxyanion_dihydrogen_phosphate', term: 'Dihydrogen phosphate ion', meaning: 'H₂PO₄⁻' },
  { id: 'oxyanion_perchlorate', term: 'Perchlorate ion', meaning: 'ClO₄⁻' },
  { id: 'oxyanion_chlorate', term: 'Chlorate ion', meaning: 'ClO₃⁻' },
  { id: 'oxyanion_chlorite', term: 'Chlorite ion', meaning: 'ClO₂⁻' },
  { id: 'oxyanion_hypochlorite', term: 'Hypochlorite ion', meaning: 'ClO⁻' },
];

const organicWords = [
  { id: 'organic_hydrocarbons', term: 'Hydrocarbons', meaning: '烃' },
  { id: 'organic_alkanes', term: 'Alkanes', meaning: '烷烃' },
  { id: 'organic_methane', term: 'Methane', meaning: '甲烷' },
  { id: 'organic_ethane', term: 'Ethane', meaning: '乙烷' },
  { id: 'organic_propane', term: 'Propane', meaning: '丙烷' },
  { id: 'organic_methanol', term: 'Methanol', meaning: '甲醇' },
  { id: 'organic_ethanol', term: 'Ethanol', meaning: '乙醇' },
  { id: 'organic_1_propanol', term: '1-Propanol', meaning: '1-丙醇' },
];

const commonIonWords = [
  { id: 'ion_hydrogen', term: 'Hydrogen ion', meaning: 'H⁺' },
  { id: 'ion_sodium', term: 'Sodium ion', meaning: 'Na⁺' },
  { id: 'ion_potassium', term: 'Potassium ion', meaning: 'K⁺' },
  { id: 'ion_silver', term: 'Silver ion', meaning: 'Ag⁺' },
  { id: 'ion_ammonium', term: 'Ammonium ion', meaning: 'NH₄⁺' },
  { id: 'ion_magnesium', term: 'Magnesium ion', meaning: 'Mg²⁺' },
  { id: 'ion_calcium', term: 'Calcium ion', meaning: 'Ca²⁺' },
  { id: 'ion_zinc', term: 'Zinc ion', meaning: 'Zn²⁺' },
  { id: 'ion_copper_ii', term: 'Copper(II) or cupric ion', meaning: 'Cu²⁺' },
  { id: 'ion_iron_ii', term: 'Iron(II) or ferrous ion', meaning: 'Fe²⁺' },
  { id: 'ion_mercury_ii', term: 'Mercury(II) or mercuric ion', meaning: 'Hg²⁺' },
  { id: 'ion_lead_ii', term: 'Lead(II) or plumbous ion', meaning: 'Pb²⁺' },
  { id: 'ion_aluminum', term: 'Aluminum ion', meaning: 'Al³⁺' },
  { id: 'ion_iron_iii', term: 'Iron(III) or ferric ion', meaning: 'Fe³⁺' },
  { id: 'ion_fluoride', term: 'Fluoride ion', meaning: 'F⁻' },
  { id: 'ion_chloride', term: 'Chloride ion', meaning: 'Cl⁻' },
  { id: 'ion_bromide', term: 'Bromide ion', meaning: 'Br⁻' },
  { id: 'ion_iodide', term: 'Iodide ion', meaning: 'I⁻' },
  { id: 'ion_hydroxide', term: 'Hydroxide ion', meaning: 'OH⁻' },
  { id: 'ion_acetate', term: 'Acetate ion', meaning: 'CH₃COO⁻' },
  { id: 'ion_oxide', term: 'Oxide ion', meaning: 'O²⁻' },
  { id: 'ion_peroxide', term: 'Peroxide ion', meaning: 'O₂²⁻' },
  { id: 'ion_sulfide', term: 'Sulfide ion', meaning: 'S²⁻' },
];

const binaryMolecularPrefixWords = [
  { id: 'binary_prefix_mono', term: 'Mono-', meaning: '1' },
  { id: 'binary_prefix_di', term: 'Di-', meaning: '2' },
  { id: 'binary_prefix_tri', term: 'Tri-', meaning: '3' },
  { id: 'binary_prefix_tetra', term: 'Tetra-', meaning: '4' },
  { id: 'binary_prefix_penta', term: 'Penta-', meaning: '5' },
  { id: 'binary_prefix_hexa', term: 'Hexa-', meaning: '6' },
  { id: 'binary_prefix_hepta', term: 'Hepta-', meaning: '7' },
  { id: 'binary_prefix_octa', term: 'Octa-', meaning: '8' },
  { id: 'binary_prefix_nona', term: 'Nona-', meaning: '9' },
  { id: 'binary_prefix_deca', term: 'Deca-', meaning: '10' },
];

const elementChapters = [
  { id: 'basic_first_20_elements', title: '基础：前二十个元素', words: basicElementWords },
  { id: 'extended_common_elements', title: '拓展：其他常见元素', words: extendedElementWords },
];

const chemistryReferenceChapters = [
  { id: 'acids', title: '酸', words: acidWords },
  { id: 'bases', title: '碱', words: baseWords },
  { id: 'salts', title: '盐', words: saltWords },
  { id: 'oxyanions', title: '含氧酸根', words: oxyanionWords },
  { id: 'organic_compounds', title: '有机物', words: organicWords },
  { id: 'common_ions', title: '常见阴阳离子', words: commonIonWords },
  {
    id: 'binary_molecular_prefixes',
    title: '二元分子化合物前缀',
    words: binaryMolecularPrefixWords,
  },
];

const baseChemistryChapters = [...elementChapters, ...chemistryReferenceChapters];
const collegeChemistryChapters = [...baseChemistryChapters, ...collegeTextbookChapters];
const chemicalPrinciplesChapters = [
  ...baseChemistryChapters,
  ...chemicalPrinciplesTextbookChapters,
];

const wordbooks = [
  {
    id: 'college_chemistry',
    name: '大学化学',
    description: '大学化学课程词库',
    image: getAssetUrl('/assets/cover/cover1.png'),

    chapters: collegeChemistryChapters,
  },
  {
    id: 'chemical_principles',
    name: '化学原理',
    description: '化学原理课程词库',
    image: getAssetUrl('/assets/cover/cover2.png'),

    chapters: chemicalPrinciplesChapters,
  },
];

export default wordbooks;
