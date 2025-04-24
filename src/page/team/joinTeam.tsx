
import LayoutClient from '../../infrastructure/common/Layouts/Client-Layout';
import BannerCommon from '../../infrastructure/common/components/banner/BannerCommon';
import banner2 from '../../assets/images/banner/banner2.png';
import "../../assets/styles/page/team.css";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import teamService from '../../infrastructure/repositories/team/team.service';
import { useEffect, useState } from 'react';
import { FullPageLoading } from '../../infrastructure/common/components/controls/loading';
import banner3 from "../../assets/images/banner/banner3.png"
import { ROUTE_PATH } from '../../core/common/appRouter';
import lock from "../../assets/images/lock.gif"
import avatar from "../../assets/images/no-avatar.png"

import { configImageURL } from '../../infrastructure/helper/helper';

const JoinTeam = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [detailTeam, setDetailTeam] = useState<any>({});
    const [member, setMember] = useState<any[]>([]);


    const { id } = useParams();
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);

    const teamId = queryParams.get('teamId');

    const navigate = useNavigate();

    const onJoinTeamAsync = async () => {
        try {
            await teamService.JoinTeam(
                String(id),
                () => { },
                setLoading
            ).then(() => {
                navigate(ROUTE_PATH.TEAM_PAGE);
            })
        }
        catch (error) {
            console.error(error);
        };
    };

    const onGetInfoTeamAsync = async () => {
        try {
            await teamService.GetTeamById(
                String(teamId),
                setLoading
            ).then((res) => {
                if (res) {
                    setDetailTeam(res);
                    setMember(res?.members)
                }
            })
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setIsLoading(false);
        };
    };

    useEffect(() => {
        onGetInfoTeamAsync().then(_ => { });
    }, []);
    console.log("detailTeam", detailTeam);

    return (
        <LayoutClient>
            <BannerCommon
                title={'Quỹ nhóm'}
                sub={'Tham gia nhóm'}
                backgroundUrl={banner2}
            />
            <div className="team-container padding-common">
                {
                    !isLoading
                    &&
                    (
                        Object.keys(detailTeam).length === 0
                            ?
                            <div className="lock-team">
                                <div className="loading-card">
                                    <div className="spinner" >
                                        <img src={lock} alt="" />
                                    </div>
                                    <p className="loading-text">Nhóm này đã bị khóa hoặc không tồn tại</p>
                                </div>
                            </div>
                            :
                            <div className="join-card">
                                <img
                                    src={detailTeam.imageCode ? configImageURL(detailTeam.imageCode) : banner3}
                                    alt="Team Avatar"
                                    className="team-avatar"
                                />
                                <h2 className="team-name">{detailTeam.name}</h2>
                                <p className="invite-message">
                                    Bạn được mời tham gia vào nhóm để cùng quản lý quỹ chung.
                                </p>
                                {
                                    member.length > 4
                                        ?
                                        <div className="member-avatars">
                                            {member.slice(3).map((item, index) => {
                                                return (
                                                    <img
                                                        key={index}
                                                        src={item.imageCode ? configImageURL(item.imageCode) : avatar}
                                                        alt="Member"
                                                    />
                                                )
                                            })}
                                            <span className="more">+{member.length - 3} </span>
                                        </div>
                                        :
                                        <div className="member-avatars">
                                            {member.map((item, index) => {
                                                return (
                                                    <img
                                                        key={index}
                                                        src={item.imageCode ? configImageURL(item.imageCode) : avatar}
                                                        alt="Member"
                                                    />
                                                )
                                            })}
                                        </div>
                                }

                                <div className="actions">
                                    <button onClick={onJoinTeamAsync} className="join-btn">Tham gia nhóm</button>
                                </div>
                            </div>
                    )
                }

            </div>
            <FullPageLoading isLoading={loading} />
        </LayoutClient>
    );
};

export default JoinTeam;
