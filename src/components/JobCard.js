import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView, 
} from 'react-native';
import HTMLView from 'react-native-htmlview';
import Modal from "react-native-modal";
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux';
import FastImage from 'react-native-fast-image';
import FastImageWithPlaceholder from './FastImageWithPlaceholder';
import Colors from '../res/Colors'
import { HEADER_INNER_HEIGHT, STATUS_BAR_HEIGHT } from '../utils'
import { resetJobSelectedIndex } from '../redux';


/*
{ id: '3299b71e-0c21-4bec-9c04-0d74c9db6331',
  type: 'Full Time',
  url: 'https://jobs.github.com/positions/3299b71e-0c21-4bec-9c04-0d74c9db6331',
  created_at: 'Mon Feb 18 08:58:54 UTC 2019',
  company: 'OTTO (GmbH & Co KG)',
  company_url: 'https://www.otto.de/',
  location: 'Hamburg, Deutschland',
  title: 'Full Stack Developer (w/m/divers) Fokus Frontend | Inhouse Startup OTTO NOW ',
  description: '<p>Direkt auf dem OTTO-Campus in Hamburg die Zukunft des E-Commerce vorantreiben. Wir investieren in neue Technologien und in die Weiterentwicklung unserer Plattform otto.de. Unsere Leidenschaft leben wir täglich in vielseitigen Teams. Sei Teil der Zukunft, an der wir gemeinsam arbeiten. Bist du bereit? Dann bewirb\' dich jetzt!</p>\n<p><strong>Wir sind OTTO NOW</strong> – das neue Geschäftsmodell von OTTO: Wir vermieten Produkte, statt sie zu verkaufen. Gemeinsam entwickeln wir mit viel Engagement und hoher Gestaltungsfreiheit einen neuen Markt. Dabei verantworten wir alle Teile des Geschäftsmodells und der zugehörigen Prozesse, die auf unserer Microservice-Plattform aufbauen.</p>\n<p>In unserem aktuell <a href="https://www.ottonow.de/team">16-köpfigen Team</a> vereinen wir zu gleichen Teilen die fachlichen und technischen Kompetenzen zur Weiterentwicklung von OTTO NOW. Von der Roadmap über die Epics bis zur einzelnen Story arbeiten bei uns Entwickler, Fachexperten und Product Owner eng zusammen.</p>\n<p>Als Inhouse Startup mit eigener Plattform erzielen wir schnelle Fortschritte. Um dabei den Überblick zu behalten, kombinieren wir die Vorzüge von Scrum und Kanban und passen diese fortlaufend an unser wachsendes Team an.</p>\n<p>﷟HYPERLINK "<a href="https://stackshare.io/otto-now/otto-now">https://stackshare.io/otto-now/otto-now</a>" Unseren <strong>Tech Stack</strong> (u.a. Kotlin, React und Typescript) findest du <a href="https://stackshare.io/otto-now/otto-now">HIER</a>!</p>\n<p><strong>Das bringt der Job</strong>:\n-Dein Schwerpunkt liegt auf der Weiterentwicklung unserer Frontends für unsere Kunden, unsere Kundenberatung und unser Team.\n-Gleichzeitig unterstützt du bei der Weiterentwicklung im Backend und dem Betrieb unserer Systeme mit verteilter Architektur (Microservices).\n-In unserem Daily berichtest du, was du am Tag zuvor durch unsere vollautomatisierte Deployment Pipeline in die Cloud gepusht hast.\n-Zusätzlich zu Konzeption, Umsetzung, Testing, QA bis zum Betrieb deiner entwickelten Software gestaltest du unsere Teamkultur und Zusammenarbeit in unseren Retros (und bei spontanen Playstation-Sessions) mit.</p>\n<p>Hast du weitere Fragen? – Dann wende dich an <a href="mailto:Soeren.Nilsson@otto.de">Soeren.Nilsson@otto.de</a>  aus dem OTTO NOW-Team oder triff uns und unsere OTTO-Kollegen <a href="https://www.otto.de/unternehmen/jobs/events/">hier</a>.</p>\n<p><strong>Das brauchen wir</strong>:</p>\n<p><strong>Must-have</strong>: Javascript-SPA-Frameworks (z.B. React, Angular, Vue); Typescript; Webpack; SASS.</p>\n<p><strong>Nice-to-have</strong>: Erfahrung in verteilter Architektur (z.B. Microservices); Erfahrung in crossfunktionaler Teamzusammenarbeit und agilen Entwicklungsmethoden (Scrum, Kanban); Bootstrap; Amazon AWS; Erfahrung mit JVM-Sprachen (bspw. Kotlin, Java, Groovy); Docker; PostgreSQL; Betrieb von ECS oder Kubernetes; Kafka; Spring-Boot; Terraform; ElasticSearch.</p>\n<p><strong>Das bieten wir</strong>:</p>\n<p>-Entwicklungsumgebung, OS und gelegentlich Home-Office statt Büro – du hast die Wahl!\n-Experten-Know-how und Gestaltungsspielraum, auch was deine persönliche und fachliche -Entwicklung betrifft – wir unterstützen dich dabei!\n-Komm mit uns auf (internationale) Fachkonferenzen wie code.talks, GOTO Berlin, JAX, DEVOXX, interne Fachevents, Hackathons und Tech Talks/Meetups wie Develop\n-<a href="https://www.otto.de/unternehmen/jobs/arbeitswelt/">Innovative Arbeitswelten</a> , flexible Arbeitszeiten (37,5-Stunden-Woche, Gleitzeit), Homeoffice- und Sabbatical-Möglichkeiten\n-Und wir bieten <a href="https://www.otto.de/unternehmen/jobs/arbeitswelt/benefits.php">noch mehr</a>!</p>\n',
  how_to_apply: '<p>Lust auf den Job? – Dann sende deine Bewerbung an <a href="mailto:vivian.musfeldt@otto.de">vivian.musfeldt@otto.de</a>. Mit der Zusendung deiner Daten stimmst du der weiteren Verarbeitung deiner Daten bei OTTO (GmbH &amp; Co KG) zu. Hier findest du unsere Datenschutzinformationen: <a href="https://www.otto.de/unternehmen/de/datenschutz.php">https://www.otto.de/unternehmen/de/datenschutz.php</a></p>\n',
  company_logo: 'https://jobs.github.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcjFlIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--88e15377a539ffd609fc55f485d18cf0386710ed/Otto_Logo_300dpi_jpg.jpg' },
*/
class JobCard extends Component {

  _renderSkills = () => {
    let { loading, jobs, jobSelectedIndex, detailView } = this.props
    if (detailView) {
      if (loading) {
        return (
          <View style={{margin: 16}}>
            <ActivityIndicator/>
          </View>
        )
      }
      else {
        if (jobs[jobSelectedIndex].relatedSkills && Array.isArray(jobs[jobSelectedIndex].relatedSkills)) {
          return (
            <View style={styles.skillSectionContainer}>
              <Text style={[styles.content2, {margin: 8}]}>Skills needed</Text>
              <View style={styles.skillContainer}>
                {jobs[jobSelectedIndex].relatedSkills.slice(0, 12).map((skill, index) => (
                  <Text key={skill.skill_uuid} style={styles.skill}>{skill.skill_name}</Text>
                ))}
              </View>
            </View>
          )
        }
        else {
          console.log("jobs[jobSelectedIndex].relatedSkills unavailable: ", jobs[jobSelectedIndex].relatedSkills)
        }        
      }
    }
  } 

  _renderCard = () => {
    //jobs[jobSelectedIndex] is provided by store, job is provided by JobList
    let { job, jobs, jobSelectedIndex, detailView } = this.props
    job = detailView ? jobs[jobSelectedIndex] : job

    return (
      <View style={detailView ? styles.cardWrapperFullScreen : styles.cardWrapper}>

        <View style={styles.headerWrapper}>
          <View style={styles.blueDot}/>
          <Text style={styles.mobileApplyText}>MOBILE APPLY</Text>
        </View>

        <View style={styles.verticalContainer}>
          <FastImageWithPlaceholder
            source={job.company_logo === null ? undefined : {uri: job.company_logo}}
            style={styles.logoImage}
            resizeMode={FastImage.resizeMode.contain}
          />
          <Text
            style={styles.title}
            numberOfLines={1}>
            {job.title}
          </Text>
          <View style={{flexDirection: "row", width: '90%', justifyContent: 'center'}}>
            <Text style={styles.content}>{job.company}</Text>
            <Text style={styles.content}> in </Text>
            <Text style={styles.content}>{job.location}</Text>
          </View>
        </View>

        <View style={styles.separator}/>

        <View style={styles.footerContainer}>
          <View style={styles.bulletPointContainer}>
            <Text style={styles.content2}>Type</Text>
            <Text style={styles.content}>{job.type}</Text>
          </View>
          <View style={styles.bulletPointContainer}>
            <Text style={styles.content2}>Date</Text>
            <Text style={styles.content}>{job.created_at}</Text>
          </View>
        </View>

        {detailView && (<View style={styles.separator}/>)}

        {detailView && (
          <ScrollView>
            {this._renderSkills()}
            {detailView && (<View style={styles.separator}/>)}
            <HTMLView
              value={"<div>" + job.description + "<div>"}
              stylesheet={styles}
            />
          </ScrollView>
        )}

      </View>
    )
  }

  _renderTouchableCard = (
    <TouchableOpacity {...this.props}>
      {this._renderCard()}
    </TouchableOpacity>
  )

  _renderScrollableModal = () => {
    return (
      <Modal
        style={styles.modal}
        isVisible={this.props.jobSelectedIndex!==null}
        swipeDirection="down"
        onSwipeComplete={() => this.props.resetJobSelectedIndex()}
        propagateSwipe={true}>
        <View style={{flex: 1}}>
          <View style={styles.header}>
            <Icon
              name="chevron-down"
              type='evilicon'
              color="#ebebeb"
              size={60}
            />
          </View>
          {this._renderCard()}
        </View>
      </Modal>
    )
  }

  render() {
    return this.props.detailView ? this._renderScrollableModal() : this._renderTouchableCard
  }
}

const LOGO_IMAGE_HEIGHT = 60

const BACKGROUND_COLOR_2 = "#ebebeb"

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "#fff",
    margin: 0,
    marginTop: STATUS_BAR_HEIGHT + 8,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  cardWrapper: {
    borderRadius: 16,
    margin: 8,
    backgroundColor: "#fff",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1,
  },
  cardWrapperFullScreen: {
    backgroundColor: "#fff",
    flex: 1,
  },
  header: {
    height: HEADER_INNER_HEIGHT,
    backgroundColor: "#fafbfc",
    //padding: 4,
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderBottomWidth: 1,
    borderColor: "#ebebeb",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    marginTop: 8,
    marginBottom: 0
  },
  blueDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.blue 
  },
  mobileApplyText: {
    fontSize: 13,
    color: Colors.green,
    marginLeft: 8,
  },
  logoImage: {
    width: LOGO_IMAGE_HEIGHT,
    height: LOGO_IMAGE_HEIGHT,
  },
  verticalContainer: {
    alignItems: 'center',
    margin: 8,
    paddingBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  content: {
    fontSize: 13,
    color: '#333',
  },
  content2: {
    fontSize: 13,
    color: '#999da0',
    marginRight: 24,
    marginLeft: 8,
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#ebebeb",
  },
  footerContainer: {
    padding: 8,
    backgroundColor: "#fafbfc",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  bulletPointContainer: {
    flexDirection: 'row',
    margin: 8
  },
  skillSectionContainer: {
    margin: 8,
    marginLeft: 16,
  },
  skillContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skill: {
    fontSize: 13,
    color: '#333',
    margin: 8,
    marginVertical: 4,
  },
  div: {
    padding: 16,
    backgroundColor: "#fafbfc",
  }
})

const mapStateToProps = state => {
  return {
    loading: state.loading,
    jobs: state.jobs,
    jobSelectedIndex: state.jobSelectedIndex,
  }
}

const mapDispatchToProps = {
  resetJobSelectedIndex
}

export default connect(mapStateToProps, mapDispatchToProps)(JobCard)
