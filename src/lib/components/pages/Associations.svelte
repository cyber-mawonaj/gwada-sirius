<script lang="ts">
	import { t, type Locale } from '$lib/i18n';

	let { locale }: { locale: Locale } = $props();
</script>

<section class="section">
	<div class="container">
		<div class="section-header center">
			<p class="section-eyebrow">Wep Ronpet</p>
			<h1>{t(locale, 'associations_title')}</h1>
			<p class="pattern-strip bogolan" aria-hidden="true" style="margin-inline:auto"></p>
			<p class="section-subtitle">{t(locale, 'associations_subtitle')}</p>
		</div>

		<div class="grid-auto">
			<div class="card">
				<h2>{t(locale, 'associations_events_title')}</h2>
				<div class="stack" style="--stack-space: 0">
					<a
						class="event-link"
						href="https://my.weezevent.com/nouvel-an-kamite"
						target="_blank"
						rel="noopener noreferrer"
					>
						<span class="event-icon" aria-hidden="true">🎊</span>
						<span class="event-info">
							<span class="event-title">{t(locale, 'associations_event1_title')}</span>
							<span class="event-platform">{t(locale, 'associations_event1_organizer')}</span>
							<span>{t(locale, 'associations_event1_desc')}</span>
						</span>
					</a>
					<a
						class="event-link"
						href="https://my.weezevent.com/nouvel-an-kamit"
						target="_blank"
						rel="noopener noreferrer"
					>
						<span class="event-icon" aria-hidden="true">✨</span>
						<span class="event-info">
							<span class="event-title">{t(locale, 'associations_event2_title')}</span>
							<span class="event-platform">{t(locale, 'associations_event2_organizer')}</span>
							<span>{t(locale, 'associations_event2_desc')}</span>
						</span>
					</a>
				</div>
			</div>

			<div class="card">
				<h2>{t(locale, 'associations_community_title')}</h2>
				<div class="stack" style="--stack-space: 0">
					<a
						class="community-link"
						href="https://14eme-membre.net/site-web/#événements"
						target="_blank"
						rel="noopener noreferrer"
					>
						<span class="community-icon" aria-hidden="true">🌍</span>
						<span class="community-info">
							<span class="community-title">{t(locale, 'associations_link1_title')}</span>
							<span>{t(locale, 'associations_link1_desc')}</span>
						</span>
					</a>
					<a
						class="community-link"
						href="https://www.facebook.com/people/Mouvement-Politique-Spirituel-MUN"
						target="_blank"
						rel="noopener noreferrer"
					>
						<span class="community-icon" aria-hidden="true">📘</span>
						<span class="community-info">
							<span class="community-title">{t(locale, 'associations_link2_title')}</span>
							<span>{t(locale, 'associations_link2_desc')}</span>
						</span>
					</a>
				</div>
			</div>
		</div>

		<h2 class="center" style="margin-top: var(--space-7)">{t(locale, 'associations_video_title')}</h2>
		<div class="video-frame card" style="margin-top: var(--space-4)">
			<iframe
				src="https://www.youtube.com/embed/0_8kWlDTf94"
				title={t(locale, 'associations_video_title')}
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowfullscreen
				loading="lazy"
			></iframe>
		</div>

		<p class="associations-note center">{t(locale, 'associations_note')}</p>
	</div>
</section>
