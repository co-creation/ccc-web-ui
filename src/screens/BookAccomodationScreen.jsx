import React from 'react'

import { Layout } from '../components'
import styles from './styles/BookAccomodationScreen.module.css'

export default function BookAccomodationScreen() {
  return (
    <Layout>
      <iframe 
        title="Accomodation Availability"
        class="airtable-embed" 
        src="https://airtable.com/embed/shrkK6Ntix10y2Pza?backgroundColor=green&viewControls=on" 
        frameborder="0" 
        onmousewheel="" 
        width="100%" 
        height="533" 
        className={styles.airtableView}>
        </iframe>
    </Layout>
  )
}
