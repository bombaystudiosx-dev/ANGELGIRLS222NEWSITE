# ANGELGIRLS222NEWSITE — Production Deployment Guide

This guide walks you through deploying the **Angel Girls 222** website to production using **Vercel** (recommended) or **Netlify**.

---

## **Quick Start: Vercel (Recommended)**

### **Step 1: Create a Vercel Account**
1. Go to [vercel.com](https://vercel.com) and sign up with GitHub.
2. Authorize Vercel to access your GitHub repositories.

### **Step 2: Import the Repository**
1. Click **"New Project"** on the Vercel dashboard.
2. Select **`bombaystudiosx-dev/ANGELGIRLS222NEWSITE`** from your GitHub repositories.
3. Vercel will auto-detect the Vite configuration. Click **"Deploy"**.

### **Step 3: Set Environment Variables**
1. In the Vercel project dashboard, go to **Settings → Environment Variables**.
2. Add the following variable:
   - **Name:** `VITE_GOOGLE_MAPS_PLATFORM_KEY`
   - **Value:** Your Google Maps API key (see instructions below)
   - **Environments:** Production, Preview, Development

3. Click **"Save"** and redeploy.

### **Step 4: Configure a Custom Domain**
1. Go to **Settings → Domains** in your Vercel project.
2. Add your custom domain (e.g., `angelgirls222.lv`).
3. Update your domain registrar's DNS records to point to Vercel (instructions provided).
4. SSL certificate is automatically provisioned.

---

## **Getting a Google Maps API Key**

The interactive Vegas Strip dispatch map requires a Google Maps API key.

### **Steps:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project or select an existing one.
3. Enable the **Maps JavaScript API**:
   - Click **"Enable APIs and Services"**.
   - Search for **"Maps JavaScript API"**.
   - Click **"Enable"**.
4. Create an API key:
   - Go to **Credentials** (left sidebar).
   - Click **"Create Credentials"** → **"API Key"**.
   - Copy the key.
5. **Restrict the key** (important for security):
   - Click on your API key.
   - Under **"Application restrictions,"** select **"HTTP referrers (web sites)"**.
   - Add your domain(s):
     ```
     https://angelgirls222.lv/*
     https://*.vercel.app/*
     ```
   - Under **"API restrictions,"** select **"Maps JavaScript API"** only.
6. Save and copy the key into Vercel's environment variables.

---

## **Alternative: Deploy to Netlify**

If you prefer Netlify:

1. Go to [netlify.com](https://netlify.com) and sign up with GitHub.
2. Click **"New site from Git"** and select your repository.
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. In **Site settings → Build & deploy → Environment**, add:
   - `VITE_GOOGLE_MAPS_PLATFORM_KEY=your_api_key`
6. Deploy and configure your custom domain.

---

## **Production Checklist**

Before going live, verify:

- [ ] **Google Maps API Key** is set and restricted to your domain.
- [ ] **Custom domain** is configured and SSL is active.
- [ ] **Environment variables** are set in production.
- [ ] **Age gate** is functioning correctly (21+ verification).
- [ ] **Booking form** submits without errors.
- [ ] **Mobile responsiveness** is tested on iOS and Android.
- [ ] **Performance** is optimized (Lighthouse score 90+).
- [ ] **Analytics** are tracking (optional but recommended).

---

## **Local Testing Before Deployment**

To test the production build locally:

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Preview the production build
npm run preview
```

The preview will run on `http://localhost:4173` and simulate the production environment.

---

## **Monitoring & Analytics**

### **Vercel Analytics (Built-in)**
Vercel provides free analytics. Check your dashboard for:
- Page views and unique visitors
- Core Web Vitals
- Performance metrics

### **Optional: Add Plausible or Fathom**
For privacy-focused analytics, consider:
- [Plausible Analytics](https://plausible.io/)
- [Fathom Analytics](https://usefathom.com/)

Add the tracking script to `index.html` in the `<head>` tag.

---

## **Troubleshooting**

### **Maps not loading?**
- Verify the API key is correct and enabled.
- Check that the domain is whitelisted in Google Cloud Console.
- Ensure `VITE_GOOGLE_MAPS_PLATFORM_KEY` is set in environment variables.

### **Build fails?**
- Run `npm run lint` locally to check for TypeScript errors.
- Ensure all dependencies are installed: `npm install`.
- Check the Vercel build logs for specific errors.

### **Age gate not working?**
- Clear browser cache and localStorage.
- Verify the verification logic in `App.tsx` (line ~300).

---

## **Support & Questions**

For issues or questions:
1. Check the [Vercel Documentation](https://vercel.com/docs).
2. Review the [Google Maps API Documentation](https://developers.google.com/maps/documentation/javascript).
3. Consult the project's GitHub repository for updates.

---

**Deployment Status:** Ready for production ✅

Last updated: May 26, 2026
