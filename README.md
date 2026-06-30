# Site Dr Aimé Marine — Questionnaires pré-consultation sommeil

Site statique de questionnaires pré-consultation pour le cabinet de Dr Marine Aimé, spécialiste du sommeil de l'enfant. Les familles remplissent le questionnaire avant leur rendez-vous Doctolib, et peuvent générer un PDF à apporter en consultation.

**Site en ligne :** https://site-dr-aime.pages.dev

---

## Architecture

```
site-dr-aime/
├── index.html                        # Page d'accueil
├── questionnaire-petit.html          # Questionnaire 0–5 ans (version interactive)
├── questionnaire-grand.html          # Questionnaire 6–12 ans (version interactive)
├── questionnaire-petit-imprimable.html  # Version PDF/impression 0–5 ans
├── questionnaire-grand-imprimable.html  # Version PDF/impression 6–12 ans
├── ressources.html                   # Ressources sommeil pour les parents
├── cgu.html                          # Conditions générales d'utilisation
├── versions.html                     # Journal des versions déployées
├── style.css                         # Styles globaux partagés
├── nav.js                            # Navigation mobile (menu hamburger)
├── wrangler.toml                     # Config déploiement Cloudflare Workers
└── .github/workflows/deploy.yml      # CI/CD : déploiement auto sur push main
```

Site 100 % statique — HTML, CSS, JS vanilla. Aucune dépendance npm, aucun framework, aucun backend.

---

## Déploiement

Le déploiement est **entièrement automatisé** via GitHub Actions.

```
push sur main  →  GitHub Actions  →  Cloudflare Workers
```

1. Le workflow `.github/workflows/deploy.yml` se déclenche à chaque push sur `main`
2. Il génère un `version.json` à partir des 20 derniers commits git
3. Il déploie via `wrangler deploy` sur Cloudflare Workers

### Prérequis secrets GitHub

| Secret | Description |
|--------|-------------|
| `CLOUDFLARE_API_TOKEN` | Token API Cloudflare avec permission Workers |

---

## Contribuer

### Règles essentielles

**1. Ne jamais pousser directement sur `main` sans tester localement**

Ouvrir le fichier HTML dans un navigateur et vérifier le rendu avant tout commit. Le déploiement est immédiat après le merge.

**2. Un commit = une intention claire**

Chaque commit doit décrire *pourquoi* le changement est fait, pas seulement *quoi* :

```
# Bien
Ajouter validation champ âge — empêche la génération PDF avec valeur vide

# Pas bien
fix bug
update questionnaire
```

**3. Ne pas modifier les fichiers imprimables sans modifier l'interactif correspondant**

Les fichiers `*-imprimable.html` sont des variantes des interactifs. Toute modification de contenu (questions, réponses, libellés) doit être répercutée dans les deux versions.

**4. Tester la génération PDF avant de pousser**

Les questionnaires génèrent un PDF via `window.print()`. Vérifier que le rendu impression est correct (Chrome → Imprimer → Enregistrer en PDF).

**5. Préserver la compatibilité mobile**

Le site est utilisé sur smartphone. Tester sur une fenêtre < 375 px de large, en particulier les formulaires et la navigation.

---

### Workflow de contribution recommandé

```bash
# 1. Créer une branche depuis main
git checkout main
git pull
git checkout -b feat/nom-du-changement

# 2. Faire les modifications
# ... éditer les fichiers ...

# 3. Tester localement (ouvrir dans le navigateur)
# Vérifier : rendu desktop, rendu mobile, génération PDF si pertinent

# 4. Committer avec un message clair
git add fichier-modifie.html
git commit -m "Description claire de ce qui change et pourquoi"

# 5. Pousser et créer une Pull Request
git push origin feat/nom-du-changement
# → Ouvrir une PR sur GitHub pour review avant merge dans main
```

---

### Conventions de nommage

| Fichier | Convention |
|---------|-----------|
| Pages HTML | `kebab-case.html` |
| Variables CSS | `--couleur-principale`, `--espacement-base` |
| IDs HTML | `kebab-case` (ex : `#section-intro`) |
| Classes CSS | `kebab-case` (ex : `.carte-question`) |

---

### Ce qu'il ne faut pas faire

- **Ne pas introduire de dépendances npm** — le site est intentionnellement sans build step
- **Ne pas utiliser de CDN externe** pour des ressources critiques — risque de coupure de service
- **Ne pas stocker de données patients** dans le code ou les fichiers statiques — le site ne collecte aucune donnée
- **Ne pas supprimer `versions.html`** — sert de journal de déploiement visible par le cabinet

---

### Signaler un problème

Ouvrir une [issue GitHub](../../issues) en précisant :
- La page concernée
- Le navigateur et l'appareil utilisés
- Ce qui est attendu vs ce qui se passe
- Une capture d'écran si possible

---

## Contexte

Site développé pour le cabinet de Dr Marine Aimé. Les questionnaires sont envoyés aux familles via Doctolib avant la consultation. L'objectif est de gagner du temps en consultation en ayant déjà les informations clés sur le sommeil de l'enfant.
