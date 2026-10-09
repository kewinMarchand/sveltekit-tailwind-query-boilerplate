<script lang="ts">
  import { SITE } from '@/core/config'
  import { PageHeader } from '@/core/ui/layouts'

  const { publisher } = SITE
</script>

<PageHeader
  title="Données personnelles"
  description="Traitement des données personnelles collectées par le formulaire de contact : finalité, base légale, durée de conservation et droits."
/>

<div class="prose-legal">
  <h2>Responsable de traitement</h2>
  <p>{publisher.name}, {publisher.address}.</p>

  <h2>Finalité</h2>
  <p>
    Les données saisies dans le formulaire de contact (nom, adresse e-mail, message) servent
    uniquement à répondre à votre demande.
  </p>

  <h2>Base légale</h2>
  <p>Le traitement repose sur votre consentement, exprimé par l’envoi volontaire du formulaire.</p>

  <h2>Durée de conservation</h2>
  <p>Les messages sont conservés trois ans à compter du dernier échange, puis supprimés.</p>

  <h2>Vos droits</h2>
  <p>Vous disposez des droits suivants sur vos données :</p>
  <ul>
    <li>droit d’accès ;</li>
    <li>droit de rectification ;</li>
    <li>droit à l’effacement ;</li>
    <li>droit d’opposition.</li>
  </ul>
  <p>
    Pour les exercer, écrivez à <a href={`mailto:${publisher.email}`}>{publisher.email}</a>. Si vous
    estimez que vos droits ne sont pas respectés, vous pouvez adresser une réclamation à la
    <a href="https://www.cnil.fr/fr/plaintes">CNIL</a>.
  </p>

  <h2>Cookies</h2>
  <p>Ce site ne dépose aucun cookie de mesure d’audience.</p>
</div>
