# 🚀 Deployment Checklist — ANGELGIRLS222NEWSITE

Use this checklist to ensure a smooth, production-ready deployment.

---

## **Pre-Deployment (Local)**

- [ ] Run `npm install` to ensure all dependencies are installed
- [ ] Run `npm run lint` to check for TypeScript errors
- [ ] Run `npm run build` to verify production build succeeds
- [ ] Run `npm run preview` to test the production build locally
- [ ] Test the age gate (verify 21+ validation works)
- [ ] Test the booking form (all fields and validations)
- [ ] Test responsive design on mobile (iPhone, Android)
- [ ] Test on multiple browsers (Chrome, Firefox, Safari, Edge)
- [ ] Verify all links and CTAs work correctly
- [ ] Check console for any errors or warnings

---

## **Google Maps Setup**

- [ ] Create a Google Cloud project at [console.cloud.google.com](https://console.cloud.google.com/)
- [ ] Enable **Maps JavaScript API**
- [ ] Create an API key
- [ ] Restrict the key to **HTTP referrers**
- [ ] Add your production domain(s):
  - `https://yourdomain.com/*`
  - `https://*.vercel.app/*` (if using Vercel)
  - `https://*.netlify.app/*` (if using Netlify)
- [ ] Restrict to **Maps JavaScript API** only
- [ ] Copy the API key (you'll need this in the next step)

---

## **Vercel Deployment (Recommended)**

### **Step 1: Create Vercel Account**
- [ ] Go to [vercel.com](https://vercel.com)
- [ ] Sign up with GitHub
- [ ] Authorize Vercel to access your repositories

### **Step 2: Import Project**
- [ ] Click **"New Project"** on Vercel dashboard
- [ ] Select `bombaystudiosx-dev/ANGELGIRLS222NEWSITE`
- [ ] Vercel auto-detects Vite settings (no changes needed)
- [ ] Click **"Deploy"**

### **Step 3: Set Environment Variables**
- [ ] Go to **Settings → Environment Variables**
- [ ] Add new variable:
  - **Name:** `VITE_GOOGLE_MAPS_PLATFORM_KEY`
  - **Value:** Your Google Maps API key
  - **Environments:** Production, Preview, Development
- [ ] Click **"Save"**
- [ ] Trigger a redeploy (Settings → Deployments → Redeploy)

### **Step 4: Configure Custom Domain**
- [ ] Go to **Settings → Domains**
- [ ] Add your custom domain (e.g., `angelgirls222.lv`)
- [ ] Follow DNS configuration instructions from your registrar
- [ ] Verify domain is connected (green checkmark)
- [ ] SSL certificate auto-provisions (usually within 5 minutes)

### **Step 5: Verify Deployment**
- [ ] Visit your production URL
- [ ] Test age gate
- [ ] Test booking form
- [ ] Verify Google Maps loads correctly
- [ ] Check Lighthouse score (aim for 90+)

---

## **Netlify Deployment (Alternative)**

### **Step 1: Create Netlify Account**
- [ ] Go to [netlify.com](https://netlify.com)
- [ ] Sign up with GitHub
- [ ] Authorize Netlify to access your repositories

### **Step 2: Create New Site**
- [ ] Click **"New site from Git"**
- [ ] Select `bombaystudiosx-dev/ANGELGIRLS222NEWSITE`
- [ ] Build settings (auto-detected):
  - **Build command:** `npm run build`
  - **Publish directory:** `dist`
- [ ] Click **"Deploy site"**

### **Step 3: Set Environment Variables**
- [ ] Go to **Site settings → Build & deploy → Environment**
- [ ] Add new variable:
  - **Key:** `VITE_GOOGLE_MAPS_PLATFORM_KEY`
  - **Value:** Your Google Maps API key
- [ ] Click **"Save"**
- [ ] Trigger a redeploy (Deploys → Trigger deploy)

### **Step 4: Configure Custom Domain**
- [ ] Go to **Site settings → Domain management**
- [ ] Add your custom domain
- [ ] Update DNS records at your registrar
- [ ] SSL certificate auto-provisions

### **Step 5: Verify Deployment**
- [ ] Visit your production URL
- [ ] Test all functionality
- [ ] Check performance metrics

---

## **Post-Deployment**

### **Monitoring**
- [ ] Set up analytics (Vercel Analytics or Plausible)
- [ ] Monitor error logs (Sentry or LogRocket)
- [ ] Check daily traffic and conversions
- [ ] Set up billing alerts in Google Cloud Console

### **Maintenance**
- [ ] Update dependencies monthly: `npm update`
- [ ] Run security audit: `npm audit`
- [ ] Review and fix any vulnerabilities
- [ ] Monitor Google Maps API usage

### **Content Updates**
- [ ] Add more Angels to the roster as needed
- [ ] Update pricing and service descriptions
- [ ] Refresh location-based content
- [ ] Update contact information

---

## **Troubleshooting**

### **Maps Not Loading?**
- [ ] Verify API key is correct
- [ ] Check that domain is whitelisted in Google Cloud Console
- [ ] Ensure `VITE_GOOGLE_MAPS_PLATFORM_KEY` is set in environment variables
- [ ] Check browser console for errors

### **Build Fails?**
- [ ] Run `npm run lint` locally to find TypeScript errors
- [ ] Check Vercel/Netlify build logs for specific errors
- [ ] Ensure all dependencies are installed: `npm install`

### **Age Gate Not Working?**
- [ ] Clear browser cache and localStorage
- [ ] Test in a private/incognito window
- [ ] Check browser console for JavaScript errors

### **Slow Performance?**
- [ ] Run Lighthouse audit
- [ ] Check bundle size: `npm run build` and review `dist/` folder
- [ ] Optimize images (use WebP format)
- [ ] Enable caching headers (already configured in `vercel.json`)

---

## **Security Verification**

- [ ] HTTPS is enforced (check URL bar)
- [ ] Security headers are present (use [securityheaders.com](https://securityheaders.com/))
- [ ] Google Maps API key is restricted
- [ ] Environment variables are not exposed in source code
- [ ] `.env.local` is in `.gitignore`
- [ ] No sensitive data in browser console

---

## **Final Sign-Off**

- [ ] All tests pass
- [ ] Performance is acceptable (Lighthouse 90+)
- [ ] Security is verified
- [ ] Team has reviewed and approved
- [ ] Backup of production environment created
- [ ] Incident response plan is in place

---

## **Go Live!** 🎉

Once all items are checked, your site is ready for production.

**Deployment Date:** _______________

**Deployed By:** _______________

**Notes:** _______________

---

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

For security best practices, see [SECURITY.md](./SECURITY.md).
