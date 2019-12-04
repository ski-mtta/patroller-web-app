import React, { Component, Props } from 'react'
import { connect } from 'react-redux'
import GoogleMapReact, { Maps } from 'google-map-react';
import { Pane, Icon } from 'evergreen-ui';

const MAP_LOCATIONS = [{
    title: 'High Hut',
    icon: 'selection',
    lat: 46.696441,
    lng: -122.026019
}, {
    title: 'Saddle',
    icon: 'selection',
    lat: 46.686495,
    lng: -122.025521
}, {
    title: 'Hay Stack',
    icon: 'selection',
    lat: 46.684418,
    lng: -122.033794
}, {
    title: 'Rock Quarry',
    icon: 'selection',
    lat: 46.681541,
    lng: -122.010621
}, {
    title: 'The Y Junction',
    icon: 'selection',
    lat: 46.678768,
    lng: -122.009348
}, {
    title: 'Snow Bowl Hut',
    icon: 'selection',
    lat: 46.674506,
    lng: -122.013777
}, {
    title: 'The Yurt',
    icon: 'selection',
    lat: 46.661759,
    lng: -121.995003
}, {
    title: 'Alpina Shed',
    icon: 'selection',
    lat: 46.689877,
    lng: -122.017969
}, {
    title: 'Upper Sno-Park',
    icon: 'unknown-vehicle',
    lat: 46.696536,
    lng: -122.004070
}, {
    title: 'Lower Sno-Park',
    icon: 'unknown-vehicle',
    lat: 46.705986,
    lng: -121.992988
}, {
    title: 'The Office',
    icon: 'selection',
    lat: 46.760535,
    lng: -122.038118
}, {
    title: 'Service Road 45 Junction',
    icon: 'selection',
    lat: 46.778242,
    lng: -122.024191
}, {
    title: 'Service Road 45 Gate',
    icon: 'unknown-vehicle',
    lat: 46.760586,
    lng: -122.040829
}, {
    title: '92 Road',
    icon: 'unknown-vehicle',
    lat: 46.794916,
    lng: -122.071865
}, {
    title: 'Copper Creek Hut',
    icon: 'selection',
    lat: 46.776730,
    lng: -121.996851
}];

class Map extends Component<any, any> {
    constructor(ops: any) {
        super(ops);
        this.state = {
            center: {
                lat: 46.721928,
                lng: -122.004811

            },
            zoom: 11
        }
    }

    render() {
        const { center, zoom } = this.state;
        return (
            <Pane height={window.screen.height} width={'100%'}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyAooEjb1pkUdjA0MRjL7v138uxn7sh7yAM" }}
                    center={center}
                    zoom={zoom}
                    options={(maps: Maps) => {
                        return {
                            mapTypeId: maps.MapTypeId.SATELLITE,
                            mapTypeControlOptions: {
                                style: maps.MapTypeControlStyle.HORIZONTAL_BAR,
                                position: maps.ControlPosition.BOTTOM_CENTER,
                                mapTypeIds: [
                                    maps.MapTypeId.ROADMAP,
                                    maps.MapTypeId.SATELLITE,
                                    maps.MapTypeId.HYBRID
                                ]
                            },
                            zoomControl: true
                        }
                    }}
                >
                    {MAP_LOCATIONS.map(({ title, lat, lng, icon }, i: any) => {
                        return (
                            <Pane onClick={() => {
                                this.setState({ center: { lat, lng }, zoom: 15 })
                            }} lat={lat} lng={lng} key={i} >
                                <Icon icon={icon} color="danger" marginRight={16} />
                                <h3 style={{ color: "white" }}>{title}</h3>
                            </Pane>
                        )
                    })}
                </GoogleMapReact>
            </Pane>
        )
    }
}

const mapStateToProps = (state: any, props: Props<any>) => {
    return {}
}

export default connect(mapStateToProps)(Map)
