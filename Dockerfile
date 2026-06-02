FROM node:20-alpine AS builder
WORKDIR /app

# NEXT_PUBLIC_* инлайнятся в JS-бандл на этапе `next build`,
# поэтому их нужно передать как build-args.
ARG NEXT_PUBLIC_SITE_URL=https://art-nexus.ru
ARG NEXT_PUBLIC_YANDEX_METRIKA_ID
ARG NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
ARG NEXT_PUBLIC_YANDEX_VERIFICATION

ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_YANDEX_METRIKA_ID=$NEXT_PUBLIC_YANDEX_METRIKA_ID
ENV NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=$NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
ENV NEXT_PUBLIC_YANDEX_VERIFICATION=$NEXT_PUBLIC_YANDEX_VERIFICATION

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["npm", "start"]
