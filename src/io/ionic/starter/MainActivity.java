/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
 */

package io.ionic.starter;

import android.content.Context;
import android.content.Intent;
import android.content.IntentSender;
import android.location.Location;
import android.net.Uri;
import android.os.Bundle;
import android.os.Handler;
import android.util.Log;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;

import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.GooglePlayServicesUtil;
import com.google.android.gms.common.api.GoogleApiClient;
import com.google.android.gms.common.api.PendingResult;
import com.google.android.gms.common.api.ResultCallback;
import com.google.android.gms.common.api.Status;
import com.google.android.gms.location.LocationListener;
import com.google.android.gms.location.LocationRequest;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.location.LocationSettingsRequest;
import com.google.android.gms.location.LocationSettingsResult;
import com.google.android.gms.location.LocationSettingsStatusCodes;

import org.apache.cordova.CordovaActivity;

public class MainActivity extends CordovaActivity implements LocationListener
{
  protected static final int REQUEST_CHECK_SETTINGS = 0x1;
  private double fusedLatitude = 0.0;
  private double fusedLongitude = 0.0;
  public static int PERMISSION_REQUEST_CODE = 1;
  public static MainActivity screen;
  Context context;
  // Google client to interact with Google API
  private GoogleApiClient mGoogleApiClient;
  private LocationRequest mLocationRequest;
  DBAdapter db = new DBAdapter(this);
  String ctype="";
  int setIntervalOn = 1000;
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
      super.init();
      screen = this;
      context = this;
      db.a(this);
      // enable Cordova apps to be started in the background
        Bundle extras = getIntent().getExtras();
        if (extras != null && extras.getBoolean("cdvStartInBackground", false)) {
            moveTaskToBack(true);
        }
      WebView wV = (WebView)appView.getEngine().getView();

      wV.addJavascriptInterface(this, "tourApp");
      //tourApp.displayLocationSettingsRequest(this);
        // Set by <content src="index.html" /> in config.xml
        loadUrl(launchUrl);
    }

  @JavascriptInterface
  public void insertTourApp(String id,String city, String Entity, String type,String Lat, String Long,String Des,String Img, String rating, String other, String review){
    db.insertTourData(id,city,Entity,type,Lat,Long,Des,Img,rating,other,review);
  }
  @JavascriptInterface
  public String searchPlace(String city,String entity,String type){
    return DBAdapter.searchPlace(city,entity,type);
  }
    @JavascriptInterface
    public void OpenMapNavigation(String lat, String longi){
     // Uri gmmIntentUri = Uri.parse("google.streetview:cbll=24.5764,73.6835");
      Uri gmmIntentUri = Uri.parse("google.navigation:q="+lat+","+longi);
      Intent mapIntent = new Intent(Intent.ACTION_VIEW, gmmIntentUri);
      mapIntent.setPackage("com.google.android.apps.maps");
      startActivity(mapIntent);
    }
@JavascriptInterface
    public void openUber(String packages){
      Intent sendIntent = getPackageManager().getLaunchIntentForPackage(packages);
      //launchIntent.putExtra("dataFromRajdhara","Hello");
		if (sendIntent != null) {
	sendIntent.setAction(Intent.ACTION_SEND);
			sendIntent.putExtra(Intent.EXTRA_TEXT, "This is my text to send.");
			sendIntent.setType("text/plain");
			startActivity(sendIntent);

    }
    else{
     // String uris = "https://m.uber.com/ul/?client_id=7eCrozOef3nK__4KdF3SKuH0JTmQuUlN&action=setPickup&pickup[latitude]=37.775818&pickup[longitude]=-122.418028&pickup[nickname]=Nitish&pickup[formatted_address]=1455%20Market%20St%2C%20San%20Francisco%2C%20CA%2094103&dropoff[latitude]=37.802374&dropoff[longitude]=-122.405818&dropoff[nickname]=Coit%20Tower&dropoff[formatted_address]=1%20Telegraph%20Hill%20Blvd%2C%20San%20Francisco%2C%20CA%2094133&product_id=a1111c8c-c720-46c3-8534-2fcdd730040d&link_text=View%20team%20roster&partner_deeplink=partner%3A%2F%2Fteam%2F9383";
     // startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse(uris)));
      startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse("https://play.google.com/store/apps/details?id=" + packages)));
    }


    }










  // check if google play services is installed on the device
  private boolean checkPlayServices() {
    int resultCode = GooglePlayServicesUtil
      .isGooglePlayServicesAvailable(this);
    if (resultCode != ConnectionResult.SUCCESS) {
      if (GooglePlayServicesUtil.isUserRecoverableError(resultCode)) {
			/*	Toast.makeText(getApplicationContext(),
						"This device is supported. Please download google play services", Toast.LENGTH_LONG)
						.show();*/
      } else {
				/*Toast.makeText(getApplicationContext(),
						"This device is not supported.", Toast.LENGTH_LONG)
						.show();*/
        //finish();
      }
      return false;
    }
    return true;
  }
  public void startFusedLocation() {
    if (mGoogleApiClient == null) {
      mGoogleApiClient = new GoogleApiClient.Builder(this).addApi(LocationServices.API)
        .addConnectionCallbacks(new GoogleApiClient.ConnectionCallbacks() {
          @Override
          public void onConnectionSuspended(int cause) {
          }

          @Override
          public void onConnected(Bundle connectionHint) {

          }
        }).addOnConnectionFailedListener(new GoogleApiClient.OnConnectionFailedListener() {

          @Override
          public void onConnectionFailed(ConnectionResult result) {

          }
        }).build();
      mGoogleApiClient.connect();
    } else {
      mGoogleApiClient.connect();
    }
  }
  @JavascriptInterface
  public void stopFusedLocation() {
    if (mGoogleApiClient != null) {
      mGoogleApiClient.disconnect();
    }
  }

  public void registerRequestUpdate(final LocationListener listener) {
    mLocationRequest = LocationRequest.create();
    mLocationRequest.setPriority(LocationRequest.PRIORITY_HIGH_ACCURACY);
    mLocationRequest.setInterval(setIntervalOn); // every second

    new Handler().postDelayed(new Runnable() {
      @Override
      public void run() {
        try {
          LocationServices.FusedLocationApi.requestLocationUpdates(mGoogleApiClient, mLocationRequest, listener);
        } catch (SecurityException e) {
          e.printStackTrace();
        } catch (Exception e) {
          e.printStackTrace();
          if (!isGoogleApiClientConnected()) {
            mGoogleApiClient.connect();
          }
          registerRequestUpdate(listener);
        }
      }
    }, setIntervalOn);
  }

  public boolean isGoogleApiClientConnected() {
    return mGoogleApiClient != null && mGoogleApiClient.isConnected();
  }

  @Override
  public void onLocationChanged(Location location) {
    setFusedLatitude(location.getLatitude());
    setFusedLongitude(location.getLongitude());
    final String latString =new Double(location.getLatitude()).toString();
    final String longString =new Double(location.getLongitude()).toString();
if(latString.equals("")){

}
else{
  WebView wv=  (WebView)appView.getEngine().getView();
  wv.post(new Runnable(){
    public void run(){
      stopFusedLocation();
      if(ctype.equals("share")){
        appView.loadUrl("javascript:callLatLongFromNamtive('" + latString + "','" + longString + "');");

      }
      else if(ctype.equals("map")){
        appView.loadUrl("javascript:callLatLongFromNamtiveformap('" + latString + "','" + longString + "');");
      }
      else
      {
        appView.loadUrl("javascript:callLatLongFromNamtive1('" + latString + "','" + longString + "');");
        //stopFusedLocation();
      }
    }
  });
  //stopFusedLocation();
}
		/*Toast.makeText(getApplicationContext(), "NEW LOCATION RECEIVED", Toast.LENGTH_LONG).show();*/


    //latitude.setText(getString(R.string.latitude_string) +" "+ getFusedLatitude());
    //longitude.setText(getString(R.string.longitude_string) +" "+ getFusedLongitude());
  }

  @JavascriptInterface
  public String getLatLongFromString(){
    return fusedLatitude+"";
  }

  @JavascriptInterface
  public String countRow(){
    return DBAdapter.countRow();
  }

  public void setFusedLatitude(double lat) {
    fusedLatitude = lat;
  }

  public void setFusedLongitude(double lon) {
    fusedLongitude = lon;
  }

  public double getFusedLatitude() {
    return fusedLatitude;
  }

  public double getFusedLongitude() {
    return fusedLongitude;
  }

  @JavascriptInterface
  public void displayLocationSettingsRequest(String ctype) {
    this.ctype = ctype;
    GoogleApiClient googleApiClient = new GoogleApiClient.Builder(context)
      .addApi(LocationServices.API).build();
    googleApiClient.connect();

    LocationRequest locationRequest = LocationRequest.create();
    locationRequest.setPriority(LocationRequest.PRIORITY_HIGH_ACCURACY);
    locationRequest.setInterval(10000);
    locationRequest.setFastestInterval(10000 / 2);

    LocationSettingsRequest.Builder builder = new LocationSettingsRequest.Builder().addLocationRequest(locationRequest);
    builder.setAlwaysShow(true);

    PendingResult<LocationSettingsResult> result = LocationServices.SettingsApi.checkLocationSettings(googleApiClient, builder.build());
    result.setResultCallback(new ResultCallback<LocationSettingsResult>() {
      @Override
      public void onResult(LocationSettingsResult result) {

        final Status status = result.getStatus();
        switch (status.getStatusCode()) {
          case LocationSettingsStatusCodes.SUCCESS:
            Log.i(TAG, "All location settings are satisfied.");
            if (checkPlayServices()) {
              startFusedLocation();
              registerRequestUpdate(screen);
            }
            break;
          case LocationSettingsStatusCodes.RESOLUTION_REQUIRED:
            Log.i(TAG, "Location settings are not satisfied. Show the user a dialog to upgrade location settings ");

            try {

              // Show the dialog by calling startResolutionForResult(), and check the result
              // in onActivityResult().

              status.startResolutionForResult(screen, REQUEST_CHECK_SETTINGS);
            } catch (IntentSender.SendIntentException e) {
              Log.i(TAG, "PendingIntent unable to execute request.");
            }
            break;
          case LocationSettingsStatusCodes.SETTINGS_CHANGE_UNAVAILABLE:
            Log.i(TAG, "Location settings are inadequate, and cannot be fixed here. Dialog not created.");
            break;
        }
      }
    });
  }

  @Override
  protected void onActivityResult(int requestCode, int resultCode, Intent data) {
    super.onActivityResult(requestCode, resultCode, data);
    if (requestCode == REQUEST_CHECK_SETTINGS) {
      if (!this.ctype.equals("share")) {
        displayLocationSettingsRequest(this.ctype);
      } else {

        this.ctype = "";
      }
    }
  }


  @Override
  protected void onStop() {
  stopFusedLocation();
    super.onStop();
  }

  @Override
  public void onPause() {

    super.onPause();

  }

  @Override
  public void onResume() {

    super.onResume();

  }


}
