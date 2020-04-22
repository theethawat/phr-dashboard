      diabetesRiskIndication =
                if(diabetes){
                    if(diabetesRisk == RiskLevel.SAFE){
                        RiskIndication("ผลอยู่ในเกณฑ์ดี",RiskLevel.SAFE)
                    }
                    else if(diabetesRisk == RiskLevel.WARNING){
                        RiskIndication("มีความเสี่ยงสูง ต้องควบคุมอาหาร",RiskLevel.DANGER)
                    }
                    else if(diabetesRisk == RiskLevel.DANGER ){
                        RiskIndication("ระดับน้ำตาลสูงเกินไป ควรพบแพทย์",RiskLevel.DANGER)
                    }
                    else if(diabetesRisk == RiskLevel.MODERATE || diabetesRisk == RiskLevel.MASSIVE){
                        RiskIndication("ควรอยู่ภายใต้การดูแลของแพทย์",RiskLevel.DANGER)
                    }
                    else{
                        RiskIndication("ไม่ทราบข้อมูล",RiskLevel.SAFE)
                    }
                }else{
                    if(diabetesRisk == RiskLevel.SAFE){
                        RiskIndication("ผลอยู่ในเกณฑ์ดีมาก",RiskLevel.SAFE)
                    }
                    else if(diabetesRisk == RiskLevel.WARNING){
                        RiskIndication("มีความเสี่ยงต่อการเป็นเบาหวาน",RiskLevel.DANGER)
                    }
                    else if(diabetesRisk == RiskLevel.DANGER ){
                        RiskIndication("ระดับน้ำตาลสูงเกินไป อาจจะเป็นเบาหวาน",RiskLevel.DANGER)
                    }
                    else if(diabetesRisk == RiskLevel.MODERATE || diabetesRisk == RiskLevel.MASSIVE){
                        RiskIndication("ควรพบแพทย์ เพื่อตรวจอย่างละเอียด",RiskLevel.DANGER)
                    }
                    else{
                        RiskIndication("ไม่ทราบข้อมูล",RiskLevel.SAFE)
                    }
                }