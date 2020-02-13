import React, { Component } from 'react';
import bankLogo from '../assets/images/bank.svg';
import blockLogo from '../assets/images/buildingBlock.svg';
import residentsLogo from '../assets/images/residents.svg';
import economyLogo from '../assets/images/economy.svg';

export default class CountryFeature extends Component {
    render(){
        return (
            <div className="ui basic segment feature">
                <div className="ui container">
                    <div className="ui content header">
                        <h2>What is Bit.Country?</h2>
                    </div>
                    <div className="ui grid">
                        <div className="four wide column">
                            <div className="ui image banner-logo">
                                Reserved Bank
                                <img src={bankLogo} />
                                <div className="ui basic center aligned segment description">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                                </div>   
                            </div>
                        </div>
                        <div className="four wide column">
                            <div className="ui image banner-logo">
                                Blocks
                                <img src={blockLogo} />
                                <div className="ui basic center aligned segment description">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                                </div> 
                            </div>
                        </div>
                        <div className="four wide column">
                            <div className="ui image banner-logo">
                                Residents
                                <img src={residentsLogo} />
                                <div className="ui basic center aligned segment description">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                                </div> 
                            </div>
                        </div>
                        <div className="four wide column">
                            <div className="ui image banner-logo">
                                Economy
                                <img src={economyLogo} />
                                <div className="ui basic center aligned segment description">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>    
        </div>
        )
    }
} 