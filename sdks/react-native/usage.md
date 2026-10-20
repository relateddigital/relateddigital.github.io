---
title: "Usage"
sidebar_position: 4
mdx:
  format: md
---

<a id="usage"></a>

# Usage

```jsx
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Button,
  View,
  ActivityIndicator,
  Platform
} from 'react-native';

import { addEventListener, removeEventListener, requestPermissions, requestIDFA, EuroMessageApi, VisilabsApi, setApplicationIconBadgeNumber, logToConsole, RDStoryView, RecommendationAttribute, RecommendationFilterType, requestLocationPermission, setGeofencingIntervalInMinute } from 'react-native-related-digital'

const App = () => {
  const [loading, setLoading] = useState(false)

  const appAlias = 'alias'

  const siteId = "SID";
  const organizationId = "OID";
  const dataSource = "datasource";

  const euroMessageApi = new EuroMessageApi(appAlias)
  const visilabsApi = new VisilabsApi(appAlias, siteId, organizationId, dataSource)

  useEffect(() => {
    logToConsole(true)

    addExtra()
    addListeners()

    return () => removeListeners()
  }, [])

  const addListeners = () => {

    addEventListener('register', async (token) => {
      const subscribeResult = await euroMessageApi.subscribe(token)

      visilabsApi.register(token, (result) => {
        
      })
    }, (notificationPayload) => {
      console.log('notification payload', notificationPayload)
    }, euroMessageApi, visilabsApi)

    addEventListener('registrationError', async (registrationError) => {
      console.log('registrationError is ', registrationError)
    }, euroMessageApi)

    addEventListener('carouselItemClicked', async (carouselItemInfo) => {
      console.log('carouselItemInfo is ', carouselItemInfo)
    }, euroMessageApi)
  }

  const addExtra = async () => {
    // IYS parameters
    // await euroMessageApi.setUserProperty('ConsentTime', '2021-06-05 10:00:00')
    // await euroMessageApi.setUserProperty('RecipientType', 'BIREYSEL')
    // await euroMessageApi.setUserProperty('ConsentSource', 'HS_MOBIL')

    // Single
    // await euroMessageApi.setUserProperty('Email', EMAIL)
    // await euroMessageApi.setUserProperty('keyid', KEYID)
    // await euroMessageApi.setUserProperty('PushPermit', 'Y')

    // Or Object
    let userData = {
      "KeyId":KEYID,
      "Email":EMAIL,
      "PushPermit":"Y" // Y=active, N=passive
    }
    return euroMessageApi.setUserProperties(userData)
  }

  const login = async () => {
    addExtra().then(() =>
      euroMessageApi.subscribe(token)
    );
  }

  const setBadgeNumber = () => {
    const number = 3
    setApplicationIconBadgeNumber(number)
  }

  const sendCustomEvent = () => {
    visilabsApi.customEvent('*', {
      'id': '1',
      'name': 'Product Name'
    })
  }

  const getRecommendations = async () => {
    try {
      const zoneId = '6'
      const productCode = ''

      const properties =  {
        "OM.cat":"65" // Category code
      }

      // optional
      const filters = [{
        attribute: RecommendationAttribute.PRODUCTCODE,
        filterType: RecommendationFilterType.equals,
        value: '78979,21312,45345'
      }]

      const recommendations = await visilabsApi.getRecommendations(zoneId, productCode, properties, filters)
      console.log('recommendations', recommendations)
    }
    catch (e) {
      console.log('recommendations error', e)
    }
  }

  const showMailSubscriptionForm = () => {
    visilabsApi.customEvent('*pagename*', {
      'OM.pv': '77',
      'OM.pn': 'Product',
      'OM.ppr': '39'
    })
  }

  const getFavoriteAttributeActions = async () => {
    try {
      const actionId = '474'

      const favoriteAttrs = await visilabsApi.getFavoriteAttributeActions(actionId)
      console.log('favoriteAttributeActions', favoriteAttrs)
    }
    catch (e) {
      console.log('favoriteAttributeActions error', e)
    }
  }

  const showSpinToWin = () => {
    visilabsApi.customEvent('*pragma_spintowin*', {
      'OM.pv': '77',
      'OM.pn': 'Nectarine Blossom & Honey Body & Hand Lotion',
      'OM.ppr': '39'
    })
  }

  const trackInstalledApps = async () => {
    // android only
    await visilabsApi.sendTheListOfAppsInstalled()
  }

  const showScratchToWin = () => {
    visilabsApi.customEvent('*pragma_scratch*', {
      'OM.pv': '77',
      'OM.pn': 'Nectarine Blossom & Honey Body & Hand Lotion',
      'OM.ppr': '39'
    })
  }

  const sendLocationPermissionEvent = async () => {
    await visilabsApi.sendLocationPermission()
  }

  const getPushMessages = async () => {
    const messages = await euroMessageApi.getPushMessages()
    console.log('messages', messages)
  }

  const getUser = async () => {
    const user = await visilabsApi.getUser()
    console.log('USER DATA', user)
  }

  const pushPermitRequest = async (isProvisional) => {
    const pushPermit = await requestPermissions(isProvisional)
    console.log("Device Push Permit",pushPermit);
    if (
        user.pushPermit == true // If permission has been granted before
        || // or
        typeof user.pushPermit === 'undefined' // If no definition has been made regarding the permission status
      ) {
      euroMessageApi.setUserProperties({pushPermit: pushPermit ? 'Y' : 'N'}).then(() => {
        euroMessageApi.subscribe(this.state.token)
      })
    }
  }

  const removeListeners = () => {
    removeEventListener('register')
    removeEventListener('registrationError')
    removeEventListener('carouselItemClicked')
    removeEventListener('inAppUrlClicked')
  }

  return (
    <>
      <SafeAreaView>
        {
          loading ?
          <ActivityIndicator 
            size='large'
            animating={loading} /> :
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <RDStoryView
              actionId={'1'} // optional
              onItemClicked={(data) => {
                console.log('Story data', data)
              }}
              style={{ flex: 1 }}
            />
            <Button 
              title='REQUEST PERMISSONS'
              onPress={() => {
                const isProvisional = false
                pushPermitRequest(isProvisional)
              }} 
            />
            <Button
              title='REQUEST IDFA'
              onPress={() => {
                requestIDFA()
              }}
            />
            <Button
              title='REQUEST LOCATION PERMISSION'
              onPress={() => {
                requestLocationPermission()
              }}
            />
            <Button
              title='LOGIN/SIGNUP'
              onPress={() => {
                login()
              }}
            />
            <Button 
              title='SET BADGE NUMBER TO 3 (IOS)'
              onPress={() => {
                setBadgeNumber()
              }} 
            />
            <Button 
              title='SEND CUSTOM EVENT'
              onPress={() => {
                sendCustomEvent()
              }} 
            />
            <Button
              title='GET RECOMMENDATIONS'
              onPress={async () => {
                await getRecommendations()
              }}
            />
            <Button
              title='SHOW MAIL FORM'
              onPress={() => {
                showMailSubscriptionForm()
              }}
            />

            <Button
              title='GET FAVORITE ATTRIBUTE ACTIONS'
              onPress={async () => {
                await getFavoriteAttributeActions()
              }}
            />

            <Button
                title='SPIN TO WIN'
                onPress={() => {
                  showSpinToWin()
                }}
              />

            <Button
                title='SCRATCH TO WIN'
                onPress={() => {
                  showScratchToWin()
                }}
              />

              <Button
                title='TRACK INSTALLED APPS'
                onPress={() => {
                  trackInstalledApps()
                }}
              />

              <Button
                title='SEND LOCATION PERMISSION'
                onPress={() => {
                  sendLocationPermissionEvent()
                }}
              />

              <Button
                title='GET PUSH MESSAGES'
                onPress={() => {
                  getPushMessages()
                }}
              />

              <Button
                title='GET USER DATA'
                onPress={() => {
                  getUser()
                }}
              />

          </ScrollView>
        }
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#FFF',
    padding: 20
  },
  divider: {
    height: 20
  }
});

export default App;

```
