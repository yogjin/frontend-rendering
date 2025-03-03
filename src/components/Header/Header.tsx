import { useMutation } from '@tanstack/react-query';
import { logout as logoutAPI } from 'apis/login';
import { SettingIcon, SidebarLeftIcon, SidebarRightIcon } from 'assets/icons';
import Button from 'components/@common/Button/Button';
import { usePageNavigate } from 'hooks/usePageNavigate';
import { styled } from 'styled-components';
import { HEADER_STYLE } from 'styles/layoutStyle';

type Props = {
  onClickLeftSidebar: () => void;
  onClickRightSidebar: () => void;
  isWritingViewerActive: boolean;
};

const Header = ({ onClickLeftSidebar, onClickRightSidebar, isWritingViewerActive }: Props) => {
  const { goIntroducePage, goMyPage } = usePageNavigate();
  const logout = useMutation(logoutAPI, {
    onSettled: () => {
      localStorage.removeItem('accessToken');
      goIntroducePage();
    },
  });

  return (
    <S.Container>
      <S.IconsBox>
        <S.TransparentButton onClick={goMyPage} aria-label="마이 페이지 이동">
          <SettingIcon width={24} height={24} />
        </S.TransparentButton>
        <S.TransparentButton onClick={onClickLeftSidebar} aria-label="왼쪽 사이드바 토글">
          <SidebarLeftIcon width={24} height={24} />
        </S.TransparentButton>
      </S.IconsBox>
      <S.IconsBox>
        <Button size="small" variant="text" onClick={() => logout.mutate()}>
          로그아웃
        </Button>
        {isWritingViewerActive && (
          <S.TransparentButton onClick={onClickRightSidebar} aria-label="오른쪽 사이드바 토글">
            <SidebarRightIcon width={24} height={24} />
          </S.TransparentButton>
        )}
      </S.IconsBox>
    </S.Container>
  );
};

export default Header;

const S = {
  Container: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 1rem;
    height: ${HEADER_STYLE.height};
  `,

  IconsBox: styled.div`
    display: flex;
  `,

  TransparentButton: styled.button`
    padding: 0.8rem 0.4rem;
    border-radius: 4px;

    &:hover {
      background-color: ${({ theme }) => theme.color.gray4};
    }
  `,
};
